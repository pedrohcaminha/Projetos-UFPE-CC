#include <stdio.h>
#include <iostream>
#include "opencv2/core.hpp"
#include "opencv2/imgproc.hpp"
#include "opencv2/features2d.hpp"
#include "opencv2/highgui.hpp"
#include "opencv2/calib3d.hpp"
#include "opencv2/features2d.hpp"

using namespace std;
using namespace cv;

int main()
{
	
	//Carregar a imagem Monalisa como padrão a ser buscado
	Mat imagem1 = imread("monalisa.png", IMREAD_GRAYSCALE); 
	imagem1.convertTo(imagem1, CV_8U); //converter a imagem para escala de cinza e para o padrão CV_8U para evitar erros

	Mat imagem2;
	// Mat imagem2 = imread("monalisa2.jpeg", COLOR_BGR2GRAY);
	VideoCapture cap(0); //Iniciada a captura de vídeo, tendo como base a webcam

	while (true)
	{
		cap >> imagem2; //o frame é carregado na imagem
		imagem2.convertTo(imagem2, CV_8U);
		cvtColor(imagem2, imagem2, COLOR_BGR2GRAY);  //converter a imagem para escala de cinza e para o padrão CV_8U para evitar erros
		
		//Detecção de features
		Ptr<Feature2D> fdetector = ORB::create(250);
		vector<KeyPoint> keypoints1, keypoints2;
		Mat descritores1, descritores2;
		fdetector->detectAndCompute(imagem1, Mat(), keypoints1, descritores1);
		fdetector->detectAndCompute(imagem2, Mat(), keypoints2, descritores2); //Detecta e computa os keypoints referentes as imagens

		//
		//Matcher usando força bruta
		BFMatcher matcher(NORM_L2);
		vector<DMatch> matches;
		matcher.match(descritores1, descritores2, matches); //são feitas as combinações 

		double distanciaMax = 0;
		double distanciaMin = 100; 
		for (int i = 0; i < descritores1.rows; i++)
		{
			double dist = matches[i].distance;
			if (dist < distanciaMin)
				distanciaMin = dist;
			if (dist > distanciaMax)
				distanciaMax = dist;
		}
		vector<DMatch> matchesPositivos;
		for (int i = 0; i < descritores1.rows; i++)
		{
			if (matches[i].distance < 5 * distanciaMin)
			{
				matchesPositivos.push_back(matches[i]);
			}
		}
		Mat imgSaida;
		drawMatches(imagem1, keypoints1, imagem2, keypoints2, matchesPositivos, imgSaida, Scalar::all(-1), Scalar::all(-1), vector<char>(), DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);
		vector<Point2f> obj;
		vector<Point2f> cena;
		for (int i = 0; i < matchesPositivos.size(); i++)
		{ //pega os keypoints para os matches positivos
			obj.push_back(keypoints1[matchesPositivos[i].queryIdx].pt);
			cena.push_back(keypoints2[matchesPositivos[i].trainIdx].pt);
		}
		Mat H = findHomography(obj, cena, RANSAC);
		vector<Point2f> obj_quina(4);
		obj_quina[0] = cvPoint(0, 0);
		obj_quina[1] = cvPoint(imagem1.cols, 0);
		obj_quina[2] = cvPoint(imagem1.cols, imagem1.rows);
		obj_quina[3] = cvPoint(0, imagem1.rows);
		vector<Point2f> cena_quina(4);
		if(!H.empty()){
			perspectiveTransform(obj_quina, cena_quina, H);
		}
		line(imgSaida, cena_quina[0] + Point2f(imagem1.cols, 0), cena_quina[1] + Point2f(imagem1.cols, 0), Scalar(0, 255, 0), 7);
		line(imgSaida, cena_quina[1] + Point2f(imagem1.cols, 0), cena_quina[2] + Point2f(imagem1.cols, 0), Scalar(0, 255, 0), 7);
		line(imgSaida, cena_quina[2] + Point2f(imagem1.cols, 0), cena_quina[3] + Point2f(imagem1.cols, 0), Scalar(0, 255, 0), 7);
		line(imgSaida, cena_quina[3] + Point2f(imagem1.cols, 0), cena_quina[0] + Point2f(imagem1.cols, 0), Scalar(0, 255, 0), 7); //desenho das linhas para exibir o plano
		imshow("Match", imgSaida);
		
		// waitKey(0) == 27;
		if (waitKey(1) == 27){
				break;
		}
	}
	return 0;
}