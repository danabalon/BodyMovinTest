import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as bodymovin from '../../assets/bodymovin/bodymovin.js';

@Component({
  selector: 'page-example2',
  templateUrl: 'example2.html',
})
export class Example2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    var anim;
    var elem = document.getElementById('bodymovin');
    var animationParams = {
      container: elem,
      renderer: 'html',
      loop: true,
      autoplay: true,
      rendererSettings: {
        progressiveLoad: false
      },
      path: 'assets/pruebaMuerte.json'
    };
    anim = bodymovin.loadAnimation(animationParams);
    console.log(anim);
      var lockeds = {
        2: false,
        3: false,
        4: false,
        5: false
      }
      var currentLayerNum = -1;
      var currentPos = [500.5, 400, -2666.667];
      var mousePos = [500.5, 400, -2666.667];

      function moveCamera(){
        currentPos[0] = currentPos[0] + (mousePos[0] - currentPos[0])*0.25;
        currentPos[1] = currentPos[1] + (mousePos[1] - currentPos[1])*0.25;
        currentPos[2] = currentPos[2] + (mousePos[2] - currentPos[2])*0.25;
        anim.animationData.layers[0].ks.p.k[0].s[0] = currentPos[0];
        anim.animationData.layers[0].ks.p.k[0].e[0] = currentPos[0];
        anim.animationData.layers[0].ks.p.k[0].s[1] = currentPos[1];
        anim.animationData.layers[0].ks.p.k[0].e[1] = currentPos[1];
        anim.animationData.layers[0].ks.p.k[0].s[2] = currentPos[2];
        anim.animationData.layers[0].ks.p.k[0].e[2] = currentPos[2];
        requestAnimationFrame(moveCamera);
      }

      anim.addEventListener('DOMLoaded', function(){

        moveCamera();

        window.addEventListener('mousemove', function(ev){
          mouseCoords.x = ev.clientX || ev.pageX;
          mouseCoords.y = ev.clientY || ev.pageY;
          var theta = Math.atan2(
            windowH/2 - mouseCoords.y,
            windowW/2 - mouseCoords.x
          );
          var layerNum = 0;
          if(theta <= Math.PI && theta > Math.PI/2){
            layerNum = 2;
          } else if(theta <= Math.PI/2 && theta > 0){
            layerNum = 3;
          } else if(theta <= 0 && theta > -Math.PI/2){
            layerNum = 4;
          } else{
            layerNum = 5;
          }
          if(!lockeds[layerNum] && anim.currentFrame > 50){
            lockeds[layerNum] = true;
            //if(currentLayerNum !== layerNum){
            currentLayerNum = layerNum;
            anim.animationData.layers[layerNum].ip = Math.ceil(anim.currentRawFrame);
            anim.animationData.layers[layerNum].st = Math.ceil(anim.currentRawFrame);
            //}
            setTimeout(function(){
              lockeds[layerNum] = false;
            },6000);
          }
          dist = Math.sqrt(Math.pow(mouseCoords.x - windowW/2, 2) + Math.pow(mouseCoords.y - windowH/2, 2));
          mousePos[0] = 500.5 + Math.cos(theta)*dist;
          mousePos[1] = 400 + Math.sin(theta)*dist;
        })

        window.addEventListener('mousewheel', function(ev){
          //-2666.667
          mousePos[2] += ev.wheelDelta;
          ev.preventDefault();
          ev.stopImmediatePropagation();
        })
      })

      var windowW, windowH, dist;
      var mouseCoords = {
        x:0,
        y:0
      }
      function calculateSize(){
        windowW = window.innerWidth;
        windowH = window.innerHeight;
      }

      window.addEventListener('resize', function(){
        calculateSize();
        anim.resize();
      })
      calculateSize();
    }
}
