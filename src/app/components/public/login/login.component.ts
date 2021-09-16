import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { 

  }

  logar(){
    try{
      if( this.email == undefined || this.senha == undefined ){
        this.mensagem = "Usuário ou senha vazio"
        return
      }

      this.authService.login(this.email, this.senha).then(() => {
        this.router.navigate(["admin/painel"]);
      }).catch( erro => {
        let detalhes = "";
        switch( erro.code ){
          case "auth/user-not-found": {
            detalhes = "Não existe usuário para o e-mail informado";
            break;
          }
          case "auth/invalid-email": {
            detalhes = "E-mail inválido";
            break;
          }
          case "auth/wrong-password": {
            detalhes = "Senha inválida";
            break
          }
          default: {
            detalhes = erro.message;
            break;
          }
        }
        this.mensagem = `Erro ao logar: ${detalhes}`;
      });        
    }catch (erro){
      this.mensagem = `Erro ao logar. Detalhes.. ${erro}`;
    }
  }

  async enviarLink(){
    const { value: email } = await Swal.fire({
      title: "Informe o e-mail cadastrado",
      input: "email",
      inputPlaceholder: 'E-mail'
    });

    if( email ){
      this.authService.resetPassword(email).then( () => {
        this.emailEnviado = true;
        this.mensagem = `E-mail enviado para ${email} com instruções para recuperação`;
      }).catch(erro => {
        this.mensagem = `Erro ao localizar o email. Detalhes... ${erro.message}`;
      })
    }
  }

  ngOnInit(): void {
  }

}
