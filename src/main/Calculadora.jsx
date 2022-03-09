import React, { Component } from "react";
import Botao from "../components/Botao";
import Display from "../components/Display";
import './Calculadora.css'

const estadoInicial = {
    valorDisplay: '0',
    limparDisplay: false,
    operacao: null,
    valores: [0, 0],
    valorCorrente: 0
}

export default class Calculadora extends Component {

    state = { ...estadoInicial }

    constructor(props) {
        super(props)
        this.adicionarDigito = this.adicionarDigito.bind(this)
        this.setarOperacao = this.setarOperacao.bind(this)
        this.limparMemoria = this.limparMemoria.bind(this)
    }

    adicionarDigito(digito) {
        if (digito === '.' && this.state.valorDisplay.includes('.')) {
            return
        }
        const limparDisplay = this.state.valorDisplay === '0'
            || this.state.limparDisplay
        const valorCorrente = limparDisplay ? '' : this.state.valorDisplay
        const valorDisplay = valorCorrente + digito
        this.setState({ valorDisplay, limparDisplay: false })

        if (digito !== '.') {
            const indice = this.state.valorCorrente
            const novoValor = parseFloat(valorDisplay)
            const valores = [...this.state.valores]
            valores[indice] = novoValor
            this.setState({ valores })
            // console.log(valores)
        }
    }
    setarOperacao(operacao) {
        if (this.state.current === 0) {
            this.setState({ operacao, valorCorrente: 1, limparDisplay: true })
        } else {
            const igual = operacao === '='
            const operacaoCorrente = this.state.operacao

            const valores = [...this.state.valores]
            try {
                switch (operacaoCorrente) {
                    case '+':
                        valores[0] = valores[0] + valores[1]
                        break;
                    case '-':
                        valores[0] = valores[0] - valores[1]
                        break;
                    case '*':
                        valores[0] = valores[0] * valores[1]
                        break;
                    case '/':
                        valores[0] = valores[0] / valores[1]
                        break;
                    case 'x²':
                        valores[0] = Math.pow(valores[0], 2)
                        break;
                    case 'x³':
                        valores[0] = Math.pow(valores[0], 3)
                        break;
                    /* REVISAR */
                    case '±':
                        valores[0] = valores[0] > 0 ? -valores[0] : valores[0]
                        break;
                    /* HA IMPLEMENTAR */
                    case '⌫':
                        console.log(valores[0])
                        break;

                    default:
                        break;
                }
                /* para evitar NaN */
                if (isNaN(valores[0]) || !isFinite(valores[0])) {
                    this.limparMemoria()
                    return
                }
            } catch (e) {
                valores[0] = this.state.valores[0]
            }
            valores[1] = 0

            this.setState({
                valorDisplay: valores[0],
                operacao: igual ? null : operacao,
                valorCorrente: igual ? 0 : 1,
                limparDisplay: !igual,
                valores
            })
        }
    }
    limparMemoria() {
        this.setState({ ...estadoInicial })
    }

    render() {
        return (
            <div className="calculadora">
                <Display valor={this.state.valorDisplay} />

                {/* linha1 */}
                <Botao label="AC" double ac click={this.limparMemoria} />
                <Botao label="±" op click={this.setarOperacao} />
                <Botao label="⌫" op double />
                {/* linha2 */}
                <Botao label="7" click={this.adicionarDigito} />
                <Botao label="8" click={this.adicionarDigito} />
                <Botao label="9" click={this.adicionarDigito} />
                <Botao label="+" op click={this.setarOperacao} />
                <Botao label="-" op click={this.setarOperacao} />
                {/* linha3 */}
                <Botao label="4" click={this.adicionarDigito} />
                <Botao label="5" click={this.adicionarDigito} />
                <Botao label="6" click={this.adicionarDigito} />
                <Botao label="*" op click={this.setarOperacao} />
                <Botao label="/" op click={this.setarOperacao} />
                {/* linha4 */}
                <Botao label="1" click={this.adicionarDigito} />
                <Botao label="2" click={this.adicionarDigito} />
                <Botao label="3" click={this.adicionarDigito} />
                <Botao label="x²" op click={this.setarOperacao} />
                <Botao label="x³" op click={this.setarOperacao} />
                {/* linha5 */}
                <Botao label="0" double click={this.adicionarDigito} />
                <Botao label="." click={this.adicionarDigito} />
                <Botao label="=" double op click={this.setarOperacao} />

            </div>
        )
    }
}