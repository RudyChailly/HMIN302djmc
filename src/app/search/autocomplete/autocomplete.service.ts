import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { serverURL } from '../../app.config';

const httpOptions = {
	headers: new HttpHeaders ({
		"Access-Control-Allow-Methods": "GET,POST",
		"Access-Control-Allow-Headers": "Content-type",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	})
}
@Injectable({
	providedIn: 'root'
})
export class AutocompleteService {

	suggestionsSubject = new Subject<any>();

	constructor(
		private http: HttpClient
	) { }

	autocompletion(saisie: string) {
		this.resetSuggestions();
		return new Promise(resolve => this.http.get(serverURL +'/autocomplete/'+encodeURIComponent(saisie)).subscribe(termes => {
			this.suggestionsSubject.next(termes);
		}));
	}

	setSuggestions(suggestions: Array<any>) {
		this.suggestionsSubject.next(suggestions);
	}

	resetSuggestions() {
		this.suggestionsSubject.next([]);
	}
}