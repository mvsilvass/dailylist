import { Component } from '@angular/core';
import { HeaderComponent } from 'app/shared/components/header/header.component';
import { FooterComponent } from 'app/shared/components/footer/footer.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';

export interface Card {
  icon: string;
  title: string;
  alt: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, FeatureCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  cards = [
    {
      icon: 'task-management.png',
      title: 'Planejamento de Tarefas',
      alt: 'Ícone de checklist representando o planejamento de tarefas',
      description:
        'Crie listas de tarefas personalizadas para trabalho, estudos ou projetos pessoais.',
    },
    {
      icon: 'task-planning.png',
      title: 'Organização Inteligente',
      alt: 'Ícone de tarefas organizadas por prioridade e categorias',
      description: 'Classifique suas tarefas por prioridade, categorias e datas de vencimento.',
    },
    {
      icon: 'task-progress.png',
      title: 'Acompanhamento de Progresso',
      alt: 'Ícone de gráfico indicando o progresso das tarefas',
      description:
        'Visualize seu progresso com indicadores simples e acompanhe o que já foi concluído.',
    },
    {
      icon: 'task-reminders.png',
      title: 'Lembretes Automáticos',
      alt: 'Ícone de sino representando lembretes e notificações',
      description: 'Receba notificações inteligentes para não perder prazos importantes.',
    },
  ];
}
