import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit{
  private data=[5,10,15,20,25]
  private svg!: any;

  ngOnInit():void{
    this.createSVG()
    this.drawCircle();
  }

  // 要素の高さ等決める処理は別のところで共通部品作った方が良さそう
  private createSVG():void{
    this.svg=d3.select('#circle')
      .append("svg")
      .attr("width",500)
      .attr("height",50)
  }

  private drawCircle():void{
    // TODO: 横幅が均等になるようにcxを再計算する
    this.svg.selectAll('circle')
      .data(this.data)
      .enter()
      .append("circle")
      .attr("cx",(d:number,i:number)=>{
      return (i*50)+25
       })
      .attr("cy",50/2).attr("r",(d:number)=>d)
      .attr("fill",(d:number)=>{
        if(d>15){
          return "blue"
        }else{
          return "green"
        }
    })
  }
}
