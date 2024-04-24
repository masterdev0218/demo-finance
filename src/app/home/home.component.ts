import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})

export class HomeComponent implements OnInit {
  title = 'json-read-example';
  marketData:any;
  filteredData:any;
  selectedData: any;
  isModalOpen = false;
  url: string = '/assets/data.json';
  constructor() {}
  convertToDollars(amount: any): string {
    return '$' + Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  openModal(index: any) {
    this.selectedData = this.marketData[index];
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  convertToPercentage(number:any) {
    // Check if the number is an integer and positive
    if (number > 0) {
      // If positive integer, add a "+" sign and convert to percentage
      return '(+' + (Number(number)).toFixed(2) + '%)';
    } else {
      // For other cases, just convert to percentage
      return '('+(Number(number)).toFixed(2) + '%)';
    }
  }

  shortenName(fullName : any)
  {
    const shortName = fullName.split(" ")[0];
    return shortName;
  }

  getColorFromStatus(number:any)
  {
    // Check if the number is an integer and positive
    if (number > 0) {
      // If positive integer, add a "+" sign and convert to percentage
      return 'text-green-400';

    } else if(number == 0) {

      return "text-black";

    } else{

      return 'text-red-400';

    }
    
  }
  
  filterData(event: any) {
    this.filteredData = this.marketData.filter((item: { name: string}) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  ngOnInit() {
    fetch(this.url).then(res => res.json())
    .then(json => {
      this.marketData = json.markets;
      this.filteredData = json.markets;
    });
  }
}
