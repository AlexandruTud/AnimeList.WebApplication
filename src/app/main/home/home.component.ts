import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/_core/services/main.service';
import { NgFor } from '@angular/common'; // Import NgFor directive
import { SelectedAnime } from 'src/_core/models/SelectedAnime';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  progress: number = 0;
  ratio: number = 0;
  episodes: number = 0;
  genres: any[] = [];
  plusAnime: SelectedAnime = { animeName: '', description: '', numberOfEpisodes: 0, genres: '', studioName: '' };
  selectedAnime: SelectedAnime = { animeName: '', description: '', numberOfEpisodes: 0, genres: '', studioName: '' };
  animes_available: any[] = [];
  search_input = document.getElementById('input');
  animes: any[] = [];
  filterApplied: string = 'false';
  errorMessage: string = '';
  constructor(private router: Router, private mainService: MainService) { }

  goToYourList() {
    this.router.navigate(['/main/yourlist']);
  }

  ngOnInit(): void {
    this.getAllAnimeList();
    this.getTopGenres();

    console.log(this.search_input);
    setInterval(() => this.search(), 500);
  }

  getAllAnimeList() {
    this.mainService.getAllAnimeList().subscribe((data: any) => {
      console.log(data);
      this.animes = data;
      this.animes_available = this.animes;
    });
  }
  goToProfile() {
    this.router.navigate(['/main/profile']);
  }

  getTopGenres() {
    this.mainService.getTopGenres().subscribe(
      (data: any) => {
        // Setați datele primite în variabila de componentă (de exemplu, genres)
        this.genres = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  search() {
    let searched_text = (<HTMLInputElement>this.search_input).value;
    if (searched_text === '') {
      return;
    }
    var j = 0;
    this.animes_available = [];
    for (let i = 0; i < this.animes.length; i++) {
      if (
        this.animes[i].animeName
          .toLowerCase()
          .includes(searched_text.toLowerCase())
      ) {
        this.animes_available[j] = this.animes[i];
        j++;
      }
    }
  }

  searchByGenre(genre: string) {
    if (this.filterApplied === genre) {
      this.animes_available = this.animes;
      this.filterApplied = 'false';
      return;
    }
    this.animes_available = [];
    this.animes_available = this.animes.filter(anime =>
      anime.genres.toLowerCase().includes(genre.toLowerCase())

    );
    this.filterApplied = genre;
  }



  openPopup(animeName: string) {
    document.querySelector('#popup')?.setAttribute('style', 'display: block');
    this.mainService.getMoreInfo().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].animeName === animeName) {

          this.selectedAnime = data[i];
          break;

        }
      }
    });


  }

  closePopup() {
    document.querySelector('#popup')?.setAttribute('style', 'display: none');
  }

  openPopup2(animeName: string) {
    this.episodes = 0;
    this.progress = 0;
    document.querySelector('#animePopup')?.setAttribute('style', 'display: block');
    this.mainService.getMoreInfo().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].animeName === animeName) {

          this.plusAnime = data[i];
          this.ratio = 100 / this.plusAnime.numberOfEpisodes;
          break;

        }
      }
    }
    );
  }

  closePopup2() {
    document.querySelector('#animePopup')?.setAttribute('style', 'display: none');
  }

  incrementEp() {
    if (this.episodes < this.plusAnime.numberOfEpisodes)
      this.episodes++;
    this.progress = this.episodes * this.ratio;
  }

  decrementEp() {
    if (this.episodes > 0) {
      this.episodes--;
    }
    this.progress = this.episodes * this.ratio;
  }



  adaugareAnime() {
    this.mainService.getAllAnimeListById(localStorage.getItem('UserId') || '').subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].animeName === this.plusAnime.animeName) {
          alert('Anime already in your list');
          return;
        }
      }
      let userId = localStorage.getItem('UserId') || '';
      let currentDate = new Date();

      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      let endDate = new Date();


      const selectedRating = (document.getElementById('rating') as HTMLSelectElement).value;

      let body = {
        userID: userId,
        animeName: this.plusAnime.animeName,
        viewedEpisodes: this.episodes,
        startDate: formatDate(currentDate),
        endDate: formatDate(endDate),
        rating: parseInt(selectedRating, 10),
      };


      this.mainService.InsertViewRecord(body).subscribe(
        (data: any) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );


      this.closePopup2();
      console.log(body);
    });

  }

  verifyDuplicateAnime() {
    let userId = localStorage.getItem('UserId');
    let animeName = this.plusAnime.animeName;
    let duplicate = false;
    for (let i = 0; i < this.animes.length; i++) {
      if (this.animes[i].animeName === animeName) {
        duplicate = true;
        break;
      }
    }
    if (duplicate === false) {
      this.adaugareAnime();
    }
    else {
      alert('Anime already in your list');
    }
  }


  signOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
