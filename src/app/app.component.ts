import { identifierModuleUrl } from '@angular/compiler';
import { Component } from '@angular/core';
import { Perguntas } from './app.model';
import {AppserviceService} from './appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pergunta: Perguntas = {
    pergunta1: '',
    pergunta2: '',
  }

  
  perguntasArray: Perguntas[]

  constructor(private appService: AppserviceService) {}

  showMe:boolean = true;
  hiddeMe:boolean = false;
  

  showButton:boolean = true;
  hiddeButton:boolean = false;
  
  item:string = '';

  countPergunta2:number=0;

  showCard:boolean = true;
  hiddeCard:boolean = false;

  count:number = 0;
  tamanho:number = 0;

  showInput:boolean = false;
  hiddeInput:boolean = false;

  input1:string = '';
  input2:string = '';


  ngOnInit()
  {
    this.appService.read().subscribe(perguntas=>{
      this.perguntasArray = perguntas
      console.log(perguntas)
    })
  
    
  }

  toogleTag()
  {
    this.showCard=!this.showCard;
    this.hiddeCard=!this.hiddeCard;

    this.showButton=true;
    this.hiddeButton=false;
    this.count = 1;
    this.item = 'O prato que você pensou é ' + this.perguntasArray.find(i=> i.id===this.count).pergunta1 + '?';

  }


  //o botao não esta chamando a pergunta 1
  showPergunta1()
  {   
    if(this.count == this.tamanho)
    {
      this.item = "Qual prato você pensou?"
      this.showButton = !this.showButton;
      this.showInput = !this.showInput;
    }else{

      this.count = this.count+1;
      this.tamanho = this.perguntasArray.length;
  
      this.item = 'O prato que você pensou é ' + this.perguntasArray.find(i=> i.id===this.count).pergunta1 + '?';
      this.countPergunta2 = this.countPergunta2 + 1;
   
    }

 
  }

  //o botao sim está chamando a pergunta 2
  showPergunta2(){

    this.countPergunta2 = this.countPergunta2 + 1;
      
    this.item = 'O prato que você pensou é ' + this.perguntasArray.find(i=> i.id===this.count).pergunta2 + '?';

    
    if(this.countPergunta2==2){
      this.item = "Acertei!!!";
      this.showButton = !this.showButton;
      this.hiddeButton = !this.hiddeButton;
    }
  }

  voltaInicio()
  {
    this.showCard=!this.showCard
    this.hiddeCard=!this.hiddeCard
    this.countPergunta2 = 0;
    this.count = 0;
    this.showInput = false;
    this.hiddeInput = false;

  }

  inserePergunta() : void {

    this.pergunta.pergunta1 = this.input2;

    this.appService.insert(this.pergunta).subscribe(()=> console.log('pergunta inserida'));

    this.voltaInicio();

  }

  mostrarInput(){
   
   this.pergunta.pergunta2 = this.input1;


    
   this.item = this.input1 + ' é ____________' + ' mas Bolo de Chocolate nao';
   this.showInput = false;
   this.hiddeInput = true;


  }

}
