import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../../../_core/services/main.service';
import { NgFor } from '@angular/common'; // Import NgFor directive
import { Router } from '@angular/router';
import { SelectedAnime } from 'src/_core/models/SelectedAnime';
import { EditAnime } from 'src/_core/models/EditAnime';
import { FormsModule } from '@angular/forms';
// Import ReactiveFormsModule at the top of your component file
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-yourlist',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './yourlist.component.html',
  styleUrl: './yourlist.component.scss'
})
export class YourlistComponent {
  animeName: string = '';
  animes_for_user: any[] = [];
  selectedAnime: SelectedAnime = { animeName: '', description: '', numberOfEpisodes: 0, genres: '', studioName: '' };
  search_input = document.getElementById('input');
  constructor(private router: Router, private mainService: MainService) { }
  userId = localStorage.getItem('UserId') || '';
  animes: any[] = [];
  editAnime: EditAnime = { animeName: '', numberOfEpisodes: 0, startDate: new Date(), endDate: new Date(), userId: '', rating: 0 };


  ngOnInit(): void {
    this.getAllAnimeListById();
    console.log(this.search_input);
    setInterval(() => this.search(), 500);
    console.log(this.userId);

  }


  getAllAnimeListById() {
    this.mainService.getAllAnimeListById(this.userId).subscribe((data: any) => {
      console.log(data);
      this.animes = data;
    });
  }

  search() {
    let searched_text = (<HTMLInputElement>this.search_input).value;
    var j = 0;
    this.animes_for_user = [];
    for (let i = 0; i < this.animes.length; i++) {
      if (
        this.animes[i].animeName
          .toLowerCase()
          .includes(searched_text.toLowerCase())
      ) {
        this.animes_for_user[j] = this.animes[i];
        j++;
      }
    }
  }


  openPopup(animeName: string) {
    document.querySelector('#popup')?.setAttribute('style', 'display: block');
    this.animeName = animeName;

  }

  closePopup() {
    document.querySelector('#popup')?.setAttribute('style', 'display: none');
  }

  openPopup2(animeName: string) {
    document.querySelector('#animePopup')?.setAttribute('style', 'display: block');
    this.animeName = animeName;

    this.mainService.getViewRecordByAnimeName(animeName, this.userId).subscribe((data: any) => {
      console.log(data);
      this.editAnime.animeName = data.animeName;
      this.editAnime.numberOfEpisodes = data.numberOfEpisodes;
      this.editAnime.startDate = data.startDate;
      this.editAnime.endDate = data.endDate;
      this.editAnime.userId = data.userId;
      this.editAnime.rating = data.rating;
    });


  }


  closePopup2() {
    document.querySelector('#animePopup')?.setAttribute('style', 'display: none');
  }


  deleteAnime() {
    let body = {
      userId: localStorage.getItem('UserId'),
      animeName: this.animeName,
    }

    console.log(body);

    this.mainService.deleteAnime(this.animeName, this.userId).subscribe(
      (data: any) => {
        console.log(data);
        this.getAllAnimeListById();
        this.closePopup();
      },
      (error) => {
        console.error(error);
      }

    );
  }




}
