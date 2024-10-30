import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatbotComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar con strings vacíos', () => {
    expect(component.question).toBe('');
    expect(component.answer).toBe('');
  });

  it('debe tener un método askQuestion', () => {
    expect(component.askQuestion).toBeDefined();
  });

  it('debe llamar al servicio HTTP cuando se llama a askQuestion', () => {
    const mockQuestion = 'test question';
    const mockResponse = { answer: 'test answer' };

    component.question = mockQuestion;
    component.askQuestion();

    const req = httpMock.expectOne('/ask');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ question: mockQuestion });

    req.flush(mockResponse);

    expect(component.answer).toBe(mockResponse.answer);
  });
});