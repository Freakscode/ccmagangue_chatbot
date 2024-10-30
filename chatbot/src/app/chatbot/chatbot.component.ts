// src/app/chatbot/chatbot.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
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