
#define CAMERAH
#define  __cdecl


#include "vec3.h"
#include "vec2.h"
#include "matrix44.h"
#include "object.h"


// #ifdef _WIN32 || WIN32
// 	#include <SDL.h>
// #elif defined(__unix__)
// 	#include <SDL2/SDL.h>
// #endif
#include <SDL2/SDL.h>

constexpr float kEpsilon = 1e-8; 

const int WIDTH = 600;
const int HEIGHT = 400;
const int INSIDE = 0; // 0000 
const int LEFT = 1;   // 0001 
const int RIGHT = 2;  // 0010 
const int BOTTOM = 4; // 0100 
const int TOP = 8;    // 1000 

const int x_max = 600; 
const int y_max = 400; 
const int x_min = 0; 
const int y_min = 0;

float Zbuffer[600*400];

#define M_PI 3.141592653589793

class camera
{
public:
    int imgWidth, imgHeight;
    float FoV, _near, _far;
    float bottom, left, top, right, aspectRatio;
    matrix44 camToWorld;
    matrix44 worldToCamera;

	vec3 _from, _at, _up;
    vec3 axisX, axisY, axisZ;

public:
    camera();
    camera(const vec3 &from, const vec3 &at, const vec3 &up,
            const float &f, const float &n,
            const int &width, const int &height, const float &far): 
            FoV(f), _near(n), imgWidth(width), imgHeight(height),
		    _from(from), _at(at), _up(up), _far(far)
            {
                top = std::tan(FoV*0.5*(M_PI/180.f)); //top = tan(FoV/2) lembre-se de converter para grau 
                bottom = top * -1; 
                aspectRatio = width / (float)height;
                right = std::tan(FoV*0.5*(M_PI/180.f)) * aspectRatio; //tan(FoV/2) * aspect-ratio
                left = right * -1; 
                // std::cout << top << " " << bottom << " " << right << " " << left << " " << right << '\n';
                look_at(from, at, up);
                
            }
            int outputCode(int x, int y) 
            {  
                int code = INSIDE; 
            
                if (x < x_min)       //esquerda 
                    code |= LEFT; 
                else if (x > x_max)  //direita 
                    code |= RIGHT; 
                if (y < y_min)       //baixo 
                    code |= BOTTOM; 
                else if (y > y_max)  //cima 
                    code |= TOP; 
            
                return code; 
            } 
            

            void cohenSutherlandClip(SDL_Renderer* renderer, int x1, int y1, int x2, int y2)
            { 

                int code1 = outputCode(x1, y1); 
                int code2 = outputCode(x2, y2); 
            
 
                bool accept = false; 
            
                while (true) 
                { 
                    if ((code1 == 0) && (code2 == 0)) 
                    { 
                        //os dois tao dentro 
                        accept = true; 
                        break; 
                    } 
                    else if (code1 & code2) 
                    { 
                        // os dois tao fora na mesma regiao 
                        break; 
                    } 
                    else
                    { 
                        //algum ponto ta fora 
                        int code_out; 
                        double x, y; 
            
                        // pega o ponto q ta fora 
                        if (code1 != 0) 
                            code_out = code1; 
                        else
                            code_out = code2; 
            
                        //y = y1 + slope * (x - x1), 
                        // x = x1 + (1 / slope) * (y - y1) 
                        if (code_out & TOP) 
                        { 
                            //acima 
                            x = x1 + (x2 - x1) * (y_max - y1) / (y2 - y1); 
                            y = y_max; 
                        } 
                        else if (code_out & BOTTOM) 
                        { 
                            //abaixo 
                            x = x1 + (x2 - x1) * (y_min - y1) / (y2 - y1); 
                            y = y_min; 
                        } 
                        else if (code_out & RIGHT) 
                        { 
                            //direita 
                            y = y1 + (y2 - y1) * (x_max - x1) / (x2 - x1); 
                            x = x_max; 
                        } 
                        else if (code_out & LEFT) 
                        { 
                            //esquerda 
                            y = y1 + (y2 - y1) * (x_min - x1) / (x2 - x1); 
                            x = x_min; 
                        } 
            
                        //sustitui pela interseção 
                        if (code_out == code1) 
                        { 
                            x1 = x; 
                            y1 = y; 
                            code1 = outputCode(x1, y1); 
                        } 
                        else
                        { 
                            x2 = x; 
                            y2 = y; 
                            code2 = outputCode(x2, y2); 
                        } 
                    } 
                } 
                if (accept) 
                { 
                    DrawLine(renderer, x1, y1, x2, y2);
                } 
            } 

            void __cdecl DrawLine(SDL_Renderer* renderer, int x1, int y1, int x2, int y2)
            {
                //return 0 on success, or -1 on error
                vec2 dir;
                dir.e[0] = x2 - x1;
                dir.e[1] = y2 - y1;
                int size = (int)floor(dir.length());
                dir.make_unit_vector();
                //vec2 start ← pinicial
                //para i = 0, i <= iterations, i++
                //SDL_RenderDrawPoint(renderer, start.x(), start.y())
                //start ← start + vetor diretor
                vec2 point(x1, y1);
                for (int i = 0; i < size; i++)
                {
                    SDL_RenderDrawPoint(renderer, point.x(), point.y());
                    point.e[0] += dir.x();
                    point.e[1] += dir.y();
                }
            }

            int value_at(int x, int y)
            {
                return y * WIDTH + x;
            }

            void reload(){
                std::fill(std::begin(Zbuffer),std::begin(Zbuffer)+240000,5000);
            }



            float sign (vec2 p1, vec2 p2, vec2 p3)
            {
                vec2 p = p2-p1;
                vec2 r = p3-p1;
                return (p.x() * r.y()) - (r.x() * p.y());
            }

            vec3 phong(vec3 normal ,vec3 Kd, vec3 Ks, float n, Obj obj, vec2 textura){
                

                vec3 raioDeLuz(0.0f, 0.0f, -1.0f);
                vec3 componenteAmbiente(40,40,40);
                float cos0 = std::max(0.0f, -dot(unit_vector(normal), raioDeLuz));
                vec3 componenteDifusa = cos0*Kd;
                vec3 R = raioDeLuz - 2*(dot(normal, raioDeLuz))*raioDeLuz;
                vec3 componenteEspecular = Ks*(pow(std::max(dot(axisZ,R),0.0f),n));
                float aux = textura.y();
                aux = 1 - aux;
                int y = obj.texture_height*aux;
                int x = obj.texture_width*textura.x();
                vec3 cor = obj.texture_buffer[y*obj.texture_width+x];
                //std::cout << cor << '\n';

                return componenteDifusa + componenteAmbiente + componenteEspecular;
                // return obj.texture_buffer[y*obj.texture_width+x];
                
            }

            void __cdecl fill_triangle(SDL_Renderer *renderer, const vec2 &v0, const vec2 &v1, const vec2 &v2, Triangle T, vec3 Z, Obj objeto){
                int xmax = v0.x() > v1.x() ? (v0.x() > v2.x() ? v0.x() : v2.x()) : (v1.x() > v2.x() ? v1.x() : v2.x());
                int ymax = v0.y() > v1.y() ? (v0.y() > v2.y() ? v0.y() : v2.y()) : (v1.y() > v2.y() ? v1.y() : v2.y());
                int xmin = v0.x() < v1.x() ? (v0.x() < v2.x() ? v0.x() : v2.x()) : (v1.x() < v2.x() ? v1.x() : v2.x());
                int ymin = v0.y() < v1.y() ? (v0.y() < v2.y() ? v0.y() : v2.y()) : (v1.y() < v2.y() ? v1.y() : v2.y());
                for (int x_atual = xmin; x_atual <= xmax; x_atual++)
                {
                    for (int y_atual = ymin; y_atual <= ymax; y_atual++)
                    {
            
                        // bool has_neg, has_pos;
                        vec2 pt(x_atual, y_atual);
                        float d3 = sign(v0, v1, pt);
                        float d1 = sign(v1, v2, pt);
                        float d2 = sign(v2, v0, pt); 

                        
                        // int iSecret = rand() % 256;
                        // int iSecret2 = rand() % 256;
                        // int iSecret3 = rand() % 256;
                        // vec3 raioDeLuz(0,0,0);
                        vec3 Kd(30,30,30); // phong model diffuse weight 
                        vec3 Ks(50,50,50); // phong model specular weight 
                        float n = 4;   // phong specular exponent 
                        if(d1 >= 0 && d2 >= 0 && d3>= 0){
                            float d4 = sign(v0, v1, v2);
                            d3/=d4;
                            d2/=d4;
                            d1/=d4;
                            float z = (d1 * (1.0/Z[0]) + d2 * (1.0/Z[1]) + d3 * (1.0/Z[2]));
                            z = 1.0/z;
                            if(z < Zbuffer[value_at(x_atual, y_atual)]){
                                Zbuffer[value_at(x_atual, y_atual)] = z;
                                vec2 TexturaVerdadeira = d1 *T.vertex[0].text + d2*T.vertex[1].text + d3*T.vertex[2].text;
                                vec3 NormalVerdadeira = d1 * T.vertex[0].nor + d2 * T.vertex[1].nor + d3 * T.vertex[2].nor;
                                vec3 color = phong(NormalVerdadeira, Kd, Ks, n, objeto, TexturaVerdadeira);
                                SDL_SetRenderDrawColor(renderer, std::min(color.r(),255.0f),  std::min(color.g(),255.0f),  std::min(color.b(),255.0f), 255); //range = [0,255]. Atribui a cor ao(s) próximo(s) DrawSomething do SDL
                                SDL_RenderDrawPoint(renderer, x_atual, y_atual); // Desenha o ponto
                        
                            }
                        }
                    }
                }
                
                                
                

            }

            void look_at(const vec3 &from, const vec3 &at, const vec3 &up)
            {
                axisZ = from - at;
                axisZ.make_unit_vector();

                axisY = up - ((dot(up,axisZ)/dot(axisZ,axisZ))*axisZ);
                axisY.make_unit_vector();

                axisX = cross(axisY, axisZ);
                axisX.make_unit_vector();

                camToWorld = matrix44({
                    axisX.x(), axisX.y(), axisX.z(), 0,
                    axisY.x(), axisY.y(), axisY.z(), 0,
                    axisZ.x(), axisZ.y(), axisZ.z(), 0,
                    from.x(), from.y(), from.z(), 1
                });
                worldToCamera = camToWorld.inverse();
            }

            bool compute_pixel_coordinates(const vec3 &pWorld, vec2 &pRaster, float &z) 
            {
                if(pWorld.z() > _from.z() ){
                    return false;
                }
                vec3 screen, pProj, projNormal;
                
                worldToCamera.mult_point_matrix(pWorld, screen); //vértice do objeto em coordenadas de mundo,
                z = -screen.z();
                pProj = vec3(screen.x()*(_near/screen.z()), screen.y()*(_near/screen.z()), _near); //ponto após aplicarmos a projeção em perspectiva será:

                matrix44 norm = matrix44( //podemos multiplicar o nosso ponto pela seguinte matriz:
                    (2*_near)/(right-left),          0,                              0,                          0,
                    0,                               (2*_near)/(bottom-top),         0,                          0,
                    -(right+left)/(right-left),      -(bottom+top)/(bottom-top),    (_far+_near)/(_far-_near),   1,
                    0,                               0,                             -(2*_near)/(_far-_near),     0
                );
                norm.mult_point_matrix(pProj, projNormal);
                pRaster = vec2((1+projNormal.x())/2*imgWidth,(1-projNormal.y())/2*imgHeight); //converter o valor normalizado que obtivemos anteriormente para o Raster Space.
                // pRaster = vec2(1+projNormal.x(),1-projNormal.y()); //converter o valor normalizado que obtivemos anteriormente para o Raster Space.
                //pRaster.x = (1+pNDC.x)/2*imgWidth
                //pRaster.y = (1- pNDC.y)/2*imgHeight


                
                // if (projNormal.x() >= left && projNormal.x() <= right && projNormal.y() >= bottom && projNormal.y() <= top){//ponto da dentro dos limites
                //     return true; //o ponto pode ser visto
                // }
                // return false; // Retornar verdadeiro se o ponto pode ser visto
                return true;
            }

            void render_scene( std::vector<Obj> objs, SDL_Renderer* renderer) {
                reload();
                vec3 light(0.0f, 0.0f, -1.0f);
                light.make_unit_vector();

                for (auto obj : objs){
                    for (int i = 0; i < obj.mesh.tris.size(); i++)
                    {
                        vec2 praster1;
                        vec2 praster2;
                        vec2 praster3;


                        vec3 col(255, 255, 255);
                        SDL_SetRenderDrawColor(renderer, 255, 255, 255, SDL_ALPHA_OPAQUE);
                        bool v1, v2, v3;
                        vec3 Z;
                        v1 = compute_pixel_coordinates(obj.mesh.tris[i].vertex[0].pos, praster1, Z[0]);
                        v2 = compute_pixel_coordinates(obj.mesh.tris[i].vertex[1].pos, praster2, Z[1]);
                        v3 = compute_pixel_coordinates(obj.mesh.tris[i].vertex[2].pos, praster3, Z[2]);
                        // std::cout << Z << '\n'; 
                        // DrawLine(renderer, 0, 0, 400, 600);
                        
                        // if(v1 && v2)
                        //     cohenSutherlandClip(renderer, praster1.x(), praster1.y(), praster2.x(), praster2.y());
                        // if(v1 && v3)
                        //     cohenSutherlandClip(renderer, praster1.x(), praster1.y(), praster3.x(), praster3.y());
                        // if(v2 && v3)
                        //     cohenSutherlandClip(renderer, praster2.x(), praster2.y(), praster3.x(), praster3.y());
                        // if(praster1.x() >= 0 & praster1.x() <= WIDTH | praster1.y() >= 0 & praster1.y() <= HEIGHT | praster2.x() >= 0 & praster2.x() <= WIDTH | praster2.y() >= 0 & praster2.y() <= HEIGHT | praster3.x() >= 0 & praster3.x() <= WIDTH | praster3.y() >= 0 & praster3.y() < HEIGHT)
                        //     praster1[0] = std::min(std::max(0.0f, praster1.x()), (float)WIDTH);
                        //     praster2[0] = std::min(std::max(0.0f, praster2.x()), (float)WIDTH);
                        //     praster3[0] = std::min(std::max(0.0f, praster3.x()), (float)WIDTH);
                        //     praster1[1] = std::min(std::max(0.0f, praster1.y()), (float)HEIGHT);
                        //     praster2[1] = std::min(std::max(0.0f, praster2.y()), (float)HEIGHT);
                        //     praster3[1] = std::min(std::max(0.0f, praster3.y()), (float)HEIGHT);
                        if(praster1.x() >= 0 & praster1.x() <= WIDTH & praster1.y() >= 0 & praster1.y() <= HEIGHT & praster2.x() >= 0 & praster2.x() <= WIDTH & praster2.y() >= 0 & praster2.y() <= HEIGHT & praster3.x() >= 0 & praster3.x() <= WIDTH & praster3.y() >= 0 & praster3.y() < HEIGHT)
                            fill_triangle(renderer, praster1, praster2, praster3, obj.mesh.tris[i], Z, obj);
                    }
                }
            }

            // bool rayTriangleIntersect( const vec3 &orig, const vec3 &dir, const vec3 &v0, const vec3 &v1, const vec3 &v2, float &t, float &u, float &v) 
            bool rayTriangleIntersect( const vec3 &orig, const vec3 &dir, const vec3 &A, const vec3 &B, const vec3 &C, vec3 *ponto, float *T) 
                { 
                        
                        float t, u, v;

                        //equação do plano
                        vec3 AB = B - A; 
                        vec3 AC = C - A; 
                        vec3 NormalDoPlano = cross(AB,AC); 
                    
                        //encontrar o ponto de interseção
                        
                        //plano e triangulo sao paralelos
                        float NormalDoPlanodotDir = dot(NormalDoPlano,dir); 
                        if (fabs(NormalDoPlanodotDir) < kEpsilon) 
                            return false; 
                    
                        //distancia 
                        float d = dot(NormalDoPlano, A); 
                    
                        //t
                        t = -(dot(NormalDoPlano, orig) - d) / NormalDoPlanodotDir; 


                        if (t < 0) return false; //o triangulo esta atras do raio
                    
                        //ponto de interseção P
                        vec3 P = orig + t * dir; 
                        
                        *ponto = P;
                        *T = t;

                        //inside-outside test
                        // aresta 0
                        vec3 aresta0 = B - A; 
                        vec3 vp0 = P - A; 
                        vec3 C0 = cross(aresta0, vp0); 
                        if (dot(NormalDoPlano, C0) < 0) return false; 
                    
                        // aresta 1
                        vec3 aresta1 = C - B; 
                        vec3 vp1 = P - B; 
                        vec3 C1 = cross(aresta0, vp0); 
                        if ((u = dot(NormalDoPlano, C1)) < 0)  return false; 
                    
                        // aresta 2
                        vec3 aresta2 = A - C; 
                        vec3 vp2 = P - C; 
                        vec3 C2 = cross(aresta0, vp0);  
                        if ((v = dot(NormalDoPlano, C2)) < 0) return false;  
                    
                        
                    
                        return true; // o raio acerta o triangulo
                    }
};