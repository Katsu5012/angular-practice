import { Component ,OnInit} from '@angular/core';
import * as d3 from 'd3';

/** Types */
type BarDataType={Framework:string,Stars:number,Released:number}

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
// TODO: refactor
export class BarComponent implements OnInit{
  private data:BarDataType[]= [
    {"Framework": "Vue", "Stars": 166443, "Released": 2014},
    {"Framework": "React", "Stars": 150793, "Released": 2013},
    {"Framework": "Angular", "Stars": 62342, "Released": 2016},
    {"Framework": "Backbone", "Stars": 27647, "Released": 2010},
    {"Framework": "Ember", "Stars": 21471, "Released": 2011},
  ];
  private data2=[1,2,3,4,5]
  private svg!: any;
  private svg2!:any;
  private margin = 100;
  private width = 800 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    this.createTexts()
  }

  private createSvg(): void {
    // .select()で操作対象を取得
    this.svg = d3.select("#bar")
      // .append()で描画するデータ分のsvgをbar内に要素を追加(後のgも同様)
      .append("svg")
      // svg要素に対して.attr()でwidth,heightを指定
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      // g要素に対して.attr()でtransformを指定
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private createTexts():void{
    this.svg2=d3.select('#bar2')

    this.svg2.selectAll('p').data(this.data2).enter().append('p').text((d:number)=>d).style("color",(d:number)=>{
      if(d>3){
        return 'red'
      }else{
        return 'blue'
      }
    })
  }

  private drawBars(data: BarDataType[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.3);

    console.log(x)

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height,0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      // 軸の左側に目盛を表示
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: BarDataType) => x(d.Framework))
      .attr("y", (d: BarDataType) => y(d.Stars))
      .attr("width", x.bandwidth())
      .attr("height", (d: BarDataType) => this.height - y(d.Stars))
      .attr("fill", "red")

    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d: BarDataType) =>{return  x(d.Framework)})
      .attr("y", (d: BarDataType) => y(d.Stars)-5)
      .text((d:BarDataType)=>d.Stars)
  }


}
