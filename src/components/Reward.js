import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GiWantedReward } from "react-icons/gi";
import { IoLogoBitcoin } from "react-icons/io";
import api from '../api/api';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import * as firebase from 'firebase';

const products = {
    "items": [
      {
        "id": 1,
        "name": "iPhone XS Max",
        "image": "iphone.jpg",
        "price": 6000.0,
        "description": "Linda tela Super Retina em dois tamanhos, incluindo a maior tela em um iPhone até hoje. Face ID ainda mais rápido. O chip mais inteligente e poderoso em um smartphone. Sistema de câmera dupla inovador com Controle de Profundidade. O iPhone XS é tudo o que você ama no iPhone. Levado ao extremo."
      },
      {
        "id": 2,
        "name": "Drone Phantom 4",
        "image": "drone.jpg",
        "price": 8600.0,
        "description": "Agora o céu é o limite para capturar imagens aéreas impressionantes de forma profissional. Com o drone Phantom 4 Pro da DJI é possível tirar fotos com resolução de 20 MP e gravar vídeos 4K em 60 fps. Com estrutura formada por ligas de titânio e magnésio - que conferem leveza e resistência ao equipamento. - o drone tem autonomia de voo de até 30 minutos. Alcança velocidade de até 72 Km/h no modo esporte. Conta, ainda, com sensor com alcance de 30 metros, controle de longo alcance de 7 Km e detecção de obstáculos em 5 direções."
      },
      {
        "id": 3,
        "name": "GoPro Hero 7",
        "image": "gopro.jpg",
        "price": 7600.0,
        "description": "Resistente e totalmente à prova d'água, a câmera HERO7 Silver da GoPro está sempre pronta para entrar em ação em praticamente todas as situações. Faça vídeos 4K sem tremer e fotos vibrantes com WDR para ter imagens espetaculares de cada momento. Com o GPS, você controla a velocidade, elevação e distância percorrida*. Com uma tela de toque intuitiva, fica fácil acessar os comandos e capturar ótimas imagens. Além disso, suas fotos e vídeos vão direto para o app GoPro no iPhone ou iPad para você compartilhar na hora**."
      },
      {
        "id": 4,
        "name": "Kindle 10a geração",
        "image": "kindle.jpg",
        "price": 350.0,
        "description": "Bateria 100% carregada em menos de 4 horas quando conectada por cabo USB a um computador ou em menos de 3 horas quando conectada a um adaptador de tomada. Compatível com redes Wi-Fi ou hotspots públicos ou privados nos padrões 802.11b, 802.11g ou 802.11n com protocolos de segurança WEP, WPA e WPA2 via autenticação com senha ou Wi-Fi Protected Setup (WPS)."
      },
      {
        "id": 5,
        "name": "Playstation 4",
        "image": "ps4.jpg",
        "price": 3000.0,
        "description": "O Console Playstation 4 Slim 1TB Hits Bundle 5 é mais leve e mais fino, o sistema PlayStation 4 dispõe de um disco rígido de 1 TB para garantir tudo o que há de melhor em jogos, músicas e muito mais. E para potencializar ainda mais, o pacote PlayStation Hits oferece jogos incríveis que vão proporcionar entretenimento com jogos dinâmicos e conectados, gráficos e velocidade intensos, com personalização inteligente, recursos sociais integrados intensamente e inovadores recursos de segunda tela."
      },
      {
        "id": 6,
        "name": "Xbox One X",
        "image": "xbox.jpg",
        "price": 2500.0,
        "description": "Seja o primeiro a experimentar o Xbox One X, projetado para os maiores fãs. No Xbox One X os jogos rodam muito melhor. Com 40% mais poder do que qualquer outro console, experimente os verdadeiros jogos 4K. Os jogos ficam com uma ótima resolução, funcionam sem problemas e carregam rapidamente, mesmo em uma tela de 1080p. O Xbox One X também funciona com todos os seus jogos e acessórios do Xbox One, bem como o Xbox Live, uma rede multiplayer avançada, que lhe oferece mais maneiras de jogar."
      }
    ]
  }

const Reward = (props) => {

  const {
    user
  } = props;

    const [product, setProduct] = useState([]);

    const [state, setState] = useState({
      error: null,
      isLoaded: false,
      items: []
    });

    async function rewarded(idprod, price) {

      const messaging = firebase.messaging();
      const token = await messaging.getToken();
      console.log(token);
      
      const body = JSON.stringify({id: user[0].uid, email: user[0].email, token: token, value: price});
      const response = await api.post('/product_reward',body);
    
      console.log(response.data);
      if (response.data.message == 'Success') {
        alert('Resgate efetuado com sucesso. Voucher code: 25a8ce08b56217eff55cc0cca382613d');
      }
      if (response.data.message == 'Failure') {
        alert('Saldo insuficiente para resgate.');
      }
    }

    const handleClick = (idprod, price) => {
      rewarded(idprod, price);
    }
  
    useEffect(() => {
      getProducts().then( (prod) => setProduct(prod.items));    
    }, []);  

    function getProducts() {
        return new Promise((resolve, reject) => {
          if (products) {
            resolve(products);
          } else {
            reject();
          }
        });
      }   
  return (
    <div className='container'>
    <div className='row'>         
        <ul>
        {product.map((prod) => { return (
        <a className='card'>
            {prod.image && (
            <img
            src={require(`../assets/images/${prod.image}`)}
            alt="Produto"
            />
            )}
            <li key={prod.id}>{prod.name} - {prod.description} <p><IoLogoBitcoin />{prod.price}</p></li>
            <Button onClick={()=>handleClick(prod.id, prod.price)}><GiWantedReward />Solicitar Resgate</Button>
        </a>
        )}
        )}
        </ul>
    </div>
    <style jsx>{`
      .container {
        margin-top: 65px;
      }
      .row {
        max-width: 680px;
        margin: 40px auto 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 640px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;

      }
      .card:hover {
        border-color: #067df7;
      }
      ul {
        list-style-type: none;
      }
      ul li{
        font-size:18px;
        color: #000000;
       }
       p {
        font-size:28px; 
        color: #000000;
       }
       img {
        height:170px;
        width:200px;
       }
    `}</style>    
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.user
});
 
const mapDispatchToProps= (dispatch)=>{    
  return{
    addUser: (user)=>{dispatch(addUser(user))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reward);