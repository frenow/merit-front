import React from "react";
import { FaFacebook, FaTwitterSquare, FaGooglePlus } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
const About = () => {
  return (
    <>
    <div className="container">
            <div className="about-title clearfix">
								<h1>Sobre <span>Merit</span></h1>
								<h3>Quem deve receber ?</h3>
								<p className="about-paddingB">Pagar as pessoas pelo trabalho sem destruir sua motivação é um dos desafios mais difíceis para a administração e, lamentavelmente, a maioria dos sistemas de remuneração é considerada injusta pelos funcionários e não científica pelos especialistas.</p>
								<p>É por isso que seria sensato considerar algumas alternativas menos conhecidas baseadas em méritos reais, em vez de desempenho imaginado.</p>
								<p>O que é essencial lembrar, no entanto, é que o aspecto mais crucial de um sistema de mérito é que todo indivíduo só pode reconhecer as contribuições de outras pessoas e que as opiniões de todos têm o mesmo peso.</p>
								<p>O sistema Merit e uma ferramenta para auxiliar nessa ardua tarefa.</p>
              </div>
						<div className="about-icons"> 
              <ul >
              <li> <FaFacebook /> <a href="https://www.facebook.com/"></a></li>
              <li> <FaTwitterSquare /><a href="https://twitter.com/"></a></li>
              <li> <FaGooglePlus /><a href="https://plus.google.com/"></a></li>
              <li> <AiFillMail /><a href="mailto:bootsnipp@gmail.com"></a></li>
              </ul> 
            </div>
    </div>
    <style jsx>{`
      .container {
        margin-top: 65px;
        background: #FFFFFF;
        color: #000000;
      }  
      p {
        text-align: justify;
        text-justify: inter-word;
        font-size:18px; 
      }
  .about-icons {margin:48px 0px 48px 0px ;}
  .about-icons i{margin-right: 10px;padding: 0px; font-size:35px;color:#323232;box-shadow: 0 0 3px rgba(0, 0, 0, .2);}
  .about-icons li {margin:0px;padding:0;display:inline-block;}

  .paddingTB60 {padding:60px 0px 60px 0px;}
  .gray-bg {background: #F1F1F1 !important;}
  .about-title {}
  .about-title h1 {color: #535353; font-size:45px;font-weight:600;}
  .about-title span {color: #00000; font-size:45px;font-weight:700;}
  .about-title h3 {color: #535353; font-size:23px;margin-bottom:24px;}
  .about-title p {color: #7a7a7a;line-height: 1.8;margin: 0 0 15px;}
  .about-paddingB {padding-bottom: 12px;}
  .about-img {padding-left: 57px;}
      `}</style>   
    </>
  );
};

export default About;
