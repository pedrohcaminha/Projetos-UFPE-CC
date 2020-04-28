#ifndef MATRIXH
#define MATRIXH

#include <cstdlib> 
#include <cstdio> 
#include <iostream> 
#include <iomanip> 
#include <cmath>
#include "vec3.h"

class matrix44 
{ 
public: 
    float x[4][4] = {{1,0,0,0},{0,1,0,0},{0,0,1,0},{0,0,0,1}}; 
 
    matrix44() {} 
    matrix44 (float a, float b, float c, float d, 
              float e, float f, float g, float h, 
              float i, float j, float k, float l, 
              float m, float n, float o, float p) 
    { 
        x[0][0] = a; x[0][1] = b; x[0][2] = c; x[0][3] = d; 
        x[1][0] = e; x[1][1] = f; x[1][2] = g; x[1][3] = h; 
        x[2][0] = i; x[2][1] = j; x[2][2] = k; x[2][3] = l; 
        x[3][0] = m; x[3][1] = n; x[3][2] = o; x[3][3] = p; 
    } 
 
    inline const float* operator[](uint8_t i) const { return x[i]; } 
    inline float* operator[](uint8_t i) { return x[i]; } 
 
    matrix44 operator *(const matrix44 &v) const{ 
        matrix44 tmp; 
        multiply (*this, v, tmp); 
        return tmp; 
    } 

    static void multiply(const matrix44 &a, const matrix44& b, matrix44 &c) 
    {  
        for (uint8_t i = 0; i < 4; ++i) { 
            for (uint8_t j = 0; j < 4; ++j) { 
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + 
                          a[i][2] * b[2][j] + a[i][3] * b[3][j]; 
            } 
        } 
    }
 
    matrix44 transposed() const { 
        matrix44 t; 
        for (uint8_t i = 0; i < 4; ++i) 
            for (uint8_t j = 0; j < 4; ++j) 
                t[i][j] = x[j][i]; 
        return t;  
    } 

    matrix44& transpose() { 
        matrix44 tmp (x[0][0], x[1][0], x[2][0], x[3][0], 
                      x[0][1], x[1][1], x[2][1], x[3][1], 
                      x[0][2], x[1][2], x[2][2], x[3][2], 
                      x[0][3], x[1][3], x[2][3], x[3][3]); 
        *this = tmp;
        return *this; 
    }

    void mult_point_matrix(const vec3 &src, vec3 &dst) const { 
        float a, b, c, w; 
 
        a = src[0] * x[0][0] + src[1] * x[1][0] + src[2] * x[2][0] + x[3][0]; 
        b = src[0] * x[0][1] + src[1] * x[1][1] + src[2] * x[2][1] + x[3][1]; 
        c = src[0] * x[0][2] + src[1] * x[1][2] + src[2] * x[2][2] + x[3][2]; 
        w = src[0] * x[0][3] + src[1] * x[1][3] + src[2] * x[2][3] + x[3][3]; 
 
        if (w != 0.0f){
            dst[0] = a / w; 
            dst[1] = b / w; 
            dst[2] = c / w; 
        }
    } 

    void mult_vec_matrix(const vec3 &src, vec3 &dst) const { 
        float a, b, c; 
 
        a = src[0] * x[0][0] + src[1] * x[1][0] + src[2] * x[2][0]; 
        b = src[0] * x[0][1] + src[1] * x[1][1] + src[2] * x[2][1]; 
        c = src[0] * x[0][2] + src[1] * x[1][2] + src[2] * x[2][2]; 
 
        dst[0] = a; 
        dst[1] = b; 
        dst[2] = c; 
    } 

    matrix44 inverse() const { 
        int i, j, k; 
        matrix44 s; 
        matrix44 t (*this); 
 
        for (i = 0; i < 3 ; i++) { 
            int pivot = i; 
 
            float pivotsize = t[i][i]; 
 
            if (pivotsize < 0) 
                pivotsize = -pivotsize; 
 
            for (j = i + 1; j < 4; j++) { 
                float tmp = t[j][i]; 
                if (tmp < 0) 
                    tmp = -tmp; 
                if (tmp > pivotsize) { 
                    pivot = j; 
                    pivotsize = tmp; 
                } 
            } 
 
            if (pivotsize == 0)
                return matrix44(); 
 
            if (pivot != i) { 
                for (j = 0; j < 4; j++) { 
                    float tmp; 
 
                    tmp = t[i][j]; 
                    t[i][j] = t[pivot][j]; 
                    t[pivot][j] = tmp; 
 
                    tmp = s[i][j]; 
                    s[i][j] = s[pivot][j]; 
                    s[pivot][j] = tmp; 
                } 
            } 
 
            for (j = i + 1; j < 4; j++) { 
                float f = t[j][i] / t[i][i]; 
 
                for (k = 0; k < 4; k++) { 
                    t[j][k] -= f * t[i][k]; 
                    s[j][k] -= f * s[i][k]; 
                } 
            } 
        } 
 
        for (i = 3; i >= 0; --i) { 
            float f; 
            if ((f = t[i][i]) == 0) 
                return matrix44(); 
            for (j = 0; j < 4; j++) { 
                t[i][j] /= f; 
                s[i][j] /= f; 
            } 
            for (j = 0; j < i; j++) { 
                f = t[j][i]; 
                for (k = 0; k < 4; k++) { 
                    t[j][k] -= f * t[i][k]; 
                    s[j][k] -= f * s[i][k]; 
                } 
            } 
        } 
        return s; 
    } 
 
    const matrix44 &invert() { 
        *this = inverse(); 
        return *this; 
    } 
}; 

#endif