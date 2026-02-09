import { Component, signal, AfterViewInit, ElementRef, ViewChild, Signal, WritableSignal } from '@angular/core';
import { Blob } from '../blob/blob.component';

@Component({
  selector: 'app-scene',
  imports: [],
  templateUrl: './scene.component.html',
  styles: [],
})
export class Scene implements AfterViewInit {

    @ViewChild('sceneElement')
    sceneElement! : ElementRef;

    public blobs: WritableSignal<Blob[]> = signal([]);
    
    MaxLive=15;

    ngAfterViewInit(): void {   
        
        const sceneContext = this.sceneElement.nativeElement.getContext("2d");
        this.sceneElement.nativeElement.height = window.innerHeight;
        this.sceneElement.nativeElement.width = window.innerWidth;
        sceneContext.fillStyle = 'rgba(0,0,0,0.5)';
        sceneContext.fillRect(0,0, window.innerWidth, window.innerHeight);
        
        setInterval(this.handleUpdate.bind(this), 1000);
    }

    handleUpdate() {
        
        const sceneContext = this.sceneElement.nativeElement.getContext("2d");
        sceneContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
        sceneContext.fillStyle = 'rgba(0,0,0,0.5)';
        sceneContext.fillRect(0,0, window.innerWidth, window.innerHeight);
        let blobsToAdd: Blob[] = [];
        if(this.shouldSpawn() && this.blobs().length < this.MaxLive)
        {
            let blob = new Blob(null);
            blobsToAdd.push(blob);
        }
        let blobsToRemove: Blob[] = [];
        
        for(let i = 0; i < this.blobs().length; i++)
        {
            let blob = this.blobs()[i];
            //debugger;
            var updateResult = blob.update();

            if(!updateResult) {
                blobsToRemove.push(blob)
                continue;
            }
            debugger
            if(this.blobs().length < this.MaxLive)
            {
                blobsToAdd.push(blob);    
                
                if(Array.isArray(updateResult)){
                    blobsToAdd.push(updateResult[1]);
                }
            }
                
            /*let image = new Image();
            image.src = "assets/baseBlob.webp"; 
            image.height = 25;
            image.width = 25;
            image.onload = () => {
            }
            */
        }
        let BlobArr = this.blobs();
        for(let i = 0; i < blobsToRemove.length; i++){
            let indexOfItem = BlobArr!.indexOf(blobsToRemove[i]);
            BlobArr!.splice(indexOfItem,1);
        }

        this.blobs.set([...BlobArr, ...blobsToAdd]);
        /*for(let i = 0; i < blobsToAdd.length; i++){
            this.blobs.push(blobsToAdd[i]);
        }*/
        for(let i = 0; i < this.blobs().length; i++){
            let blob = this.blobs()[i];
            const sceneContext = this.sceneElement.nativeElement.getContext("2d");
            //sceneContext.drawRect(blob.positionX, blob.positionY, 25, 25);
            sceneContext.beginPath();
            sceneContext.arc(blob.positionX, blob.positionY, 20, 0, 360);
            sceneContext.fillStyle = `rgba(${blob.colorR}, ${blob.colorG}, ${blob.colorB}, 0.5)`;
            sceneContext.fill();
            sceneContext.stroke();

        }
    }

    shouldSpawn() {
        //return false;
        let rand = Math.random();   
        return rand > 0.05;
    }
}
