import { Component } from '@angular/core';

/*@Component({
  selector: 'app-blob',
  imports: [],
  template: '',
  styles: [],
})*/
export class Blob {

    public positionX: number = 0;
    public positionY: number = 0;

    public colorR: number = 151;
    public colorG: number = 5;
    public colorB: number = 105;

    deathRate: number = 0;
    mutationRate: number = 0;
    replicationRate: number = 0;
    XTarget: number = 0;
    YTarget: number = 0;
    constructor(parent: Blob | null, clone: boolean = false) {
        if(clone){
            this.positionX = parent!.positionX;
            this.positionY = parent!.positionY;

            this.deathRate = parent!.deathRate;
            this.mutationRate = parent!.mutationRate;
            this.replicationRate = parent!.replicationRate;
            this.colorR = parent!.colorR;
            this.colorG = parent!.colorG;
            this.colorB = parent!.colorB;


        }
        else {

            this.positionX = parent?.positionX ?? 0;
            this.positionY = parent?.positionY ?? 0;
            
            this.deathRate = Math.max(this.getNewValue(parent?.deathRate), 0.02);
            this.mutationRate = this.getNewValue(parent?.mutationRate);
            this.replicationRate = this.getNewValue(parent?.replicationRate);
            this.colorR = Math.max(Math.min(parent?.colorR ?? (Math.random() * 1000) % 255,255),0);
            this.colorG = Math.max(Math.min(parent?.colorG ?? (Math.random() * 1000) % 255,255),0);
            this.colorB = Math.max(Math.min(parent?.colorB ?? (Math.random() * 1000) % 255,255),0);

        }
        this.XTarget= 0
        this.YTarget    = 0
    }

    public update() : Blob | Blob[] | null {
        if(this.shouldDie()) {
            debugger
            return null;
        }
        if(this.XTarget=0){
            if (Math.random()>0.5) {
                this.XTarget=Math.floor(Math.random() * 10);
            } else {
                this.XTarget=(Math.floor(Math.random() * 10)*-1);
            }
        }
        if(this.YTarget=0){
            if (Math.random()<0.5) {
                this.YTarget=Math.floor(Math.random() * 10);
            } else {
                this.YTarget=(Math.floor(Math.random() * 10)*-1);
            }
        }
        if (this.XTarget>0) {
            this.positionX++
            this.XTarget--
        } else {
            this.positionX--
            this.XTarget++
        }
        if (this.YTarget>0) {
            this.positionY++
            this.YTarget--
        } else {
            this.positionY--
            this.YTarget++
        }
        if (this.positionX<0){
            this.positionX=0
        }
        if (this.positionY<0){
            this.positionY=0
        }
        if (this.positionX>window.innerWidth){
            this.positionX=window.innerWidth
        }
        if (this.positionY>window.innerHeight){
            this.positionY=window.innerHeight
        }
        if(this.shouldReplicate()) {
//            debugger;
            let blobs : Blob[] = [this];
            if(this.shouldMutate()){
                blobs.push(new Blob(this))
            }
            else {
                debugger
                let clone = this.mitosis(this);
                blobs.push(clone);
            }

            return blobs;
        }

        return this;
    }

    mitosis(parent: Blob): Blob {
        let dividedBlob = new Blob(parent, true);

        return dividedBlob;
    }

    getNewValue(rate: number | undefined): number {
        rate = rate ?? Math.random();
        var growOrShrinkMultiplier = Math.random() > 0.5 ? 1 : -1;
        return Math.max(Math.min(rate + (Math.random() * growOrShrinkMultiplier), 1), 0);
    }

    shouldDie() {
        return Math.random() <= this.deathRate;
    }

    shouldReplicate() {
        return Math.random() >= this.replicationRate;
    }

    shouldMutate() {
        return Math.random() >= this.mutationRate;
    }
}
