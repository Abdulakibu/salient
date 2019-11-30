import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {filmsData, filmsTotal, moreFilmsTotal, boxOfficeTotal, celebritySalaryData} from '../backend'
import {Chart} from 'chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Celebraty Charts for Salient by Abdul Akibu';
  filmsTotal = filmsTotal;
  moreFilmsTotal = moreFilmsTotal;
  boxOfficeTotal = boxOfficeTotal;
  ELEMENT_DATA = this.structureData(celebritySalaryData);
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = ['name', 'annualSalary', 'year'];
  PieChart = [];
  ngOnInit() {
    const label = this.parseFilmData('year');
    const data = this.parseFilmData('movieCount');
    this.PieChart = new Chart('pieChart', {
      type: 'doughnut',
    data: {
     labels: label,
     datasets: [{
         label: '# of Films',
         data: data,
         backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)',
             'rgba(76, 0, 153, 0.2)',
             'rgba(204, 102, 0, 0.2)',
             'rgba(51, 0, 102, 0.2)',
             'rgba(198, 43, 102, 0.2)',
             'rgba(200, 158, 153, 0.2)'
         ],
         borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)',
             'rgba(76, 0, 153, 1)',
             'rgba(204, 102, 0, 1)',
             'rgba(51, 0, 102, 1)',
             'rgba(198, 43, 102, 1)',
             'rgba(200, 158, 153, 1)'
         ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Top 100 Celebs Appearing in Films Breakdown by Year (2009-2019)",
         display:true,
     }
    }
    });
  }
  parseFilmData(key){
    const itemsArray =[]
    for (let film of filmsData) {
      itemsArray.push(film[key])
    }
    return itemsArray;
  }
  applyFilter(filterValue: string, ) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)
  }
  structureData(celebritySalaryData) {
    console.log(celebritySalaryData)
    const celebratyArray = []
    for(let celebraty of celebritySalaryData) {
      for(let annualSalary of celebraty.annualSalary) {
        const obj = {
          name: celebraty.name,
          annualSalary: annualSalary.salary,
          year: annualSalary.year
        }
        celebratyArray.push(obj)
      }
    }
    return celebratyArray;
  }
}
