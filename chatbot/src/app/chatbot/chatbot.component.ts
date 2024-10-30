import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  question: string = '';
  answer: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  askQuestion() {
    this.http.post<{ answer: string }>('/ask', { question: this.question })
      .subscribe(response => {
        this.answer = response.answer;
      });
  }
}