import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'trans-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    readonly CANDIDATE: String = 'candidate';
    readonly RECRUITER: String = 'recruiter';

    areaFormHome: String = this.CANDIDATE;

    depoimentos = [
        {
         name: 'Vitor Hugo Germano',
         company: 'Lambda3',
          message: 'Nós da lambda3 ficamos muito felizes ao receber' +
          'em nosso time de desenvolvimento profissionais trans que agregam' +
          ' muito valor ao nosso ambiente de trabalho e trazem resultados bem' +
          ' importantes para nossos clientes. Estamos sempre em busca de pessoas' +
          ' com talento, não importando sua identidade de gênero e/ou orientação sexual.'
        },
        {
            name: 'Anna', company: 'Anna Company', message: 'ghsjgdjysajgdysgdsfdytrdygfd'
        },
        {
            name: 'Peter', company: 'Peter Company', message: 'tfsdgsdghsgvb ygyfghjgdhjg fygtdygduy'
        }
    ];

    parceiros = [
        {url: '#',
         alt: 'Logo comissão de atenção a diversidade sexual de Osaco',
         src: '/dist/public/images/logos_parceiros/comissao_de_atencao_a_diversidade_sexual_osasco.png'
        },
        {url: '#',
         alt: 'Logo do TXAI',
         src: '/dist/public/images/logos_parceiros/coordenadoria_da_mulher_promocao_da_igualdade_racial_e_diversidade_sexual.png'
        },
        {url: '#',
         alt: 'Logo da SP escola de teatro',
         src: '/dist/public/images/logos_parceiros/sp_escola_de_teatro.png'
        },
        {url: '#',
         alt: 'Logo da comissão de diversidade seual',
         src: '/dist/public/images/logos_parceiro/coissao_da_diversidade_sexual.png'
    },
       {url: '#',
         alt: 'logo da ABRAT',
         src: '/dist/public/images/logos_parceiros/abrat.png'
        },
        {url: '#',
         alt: 'Logo da Sex Box',
         src: '/dist/public/images/logos_parceiros/ssex_bbox.png'
        },
        {url: 'http://www.lambda3.com.br',
         alt: 'logo da Lambda3',
         src: '/dist/public/images/logos_parceiros/lambda3.png'
        },
        {url: '#',
         alt: 'Logo da coordenadoria da mulher promocao da igualdade_racial e diversidade sexual',
         src: '/dist/public/images/logos_parceiros/coordenadoria_da_mulher_promocao_da_igualdade_racial_e_diversidade_sexual.png'
        }
    ];

    constructor() { }

    ngOnInit() { }

    setAreaFormHome(role: string) {
        this.areaFormHome = role;
    }
}