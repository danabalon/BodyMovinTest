import { Component } from '@angular/core';
// import { AnimationItem } from 'bodymovin';
import * as bodymovin from 'bodymovin';
// import lottie from 'lottie-web';


@Component({
  selector: 'page-canvas-lottie4',
  templateUrl: 'canvas-lottie4.html',
})
export class CanvasLottie4Page {

  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1.5;

  lottieJson = 'assets/uploadok.json';

  constructor() {
    this.lottieConfig = {
      path: this.lottieJson,
      autoplay: true,
      autoloadSegments: false,
      loop: true
    };
  }

  uploading = [0, 85];
  successfulUpload = [85, 169];
  finished = [168, 169];
  handleAnimation(anim) {
    console.log(anim.animationData);
    this.anim = anim;
    this.anim.setSpeed(1.5);
    this.anim.addEventListener("data_ready", loopE => {
      this.anim.playSegments([this.uploading], true); // 84 frames
    });
    setTimeout(() => {
      console.log("complete ........");
      this.anim.addEventListener('loopComplete', () => {
        this.anim.playSegments([this.successfulUpload], true);
        this.anim.addEventListener('loopComplete', () => {
          this.anim.playSegments([this.finished], true);
          this.anim.stop();
        });
      });
    }, 5000);
  }



}
