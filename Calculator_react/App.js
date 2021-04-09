import Style from './src/Style';
import InputButton from './src/InputButton';

import React, {
  Component
} from 'react';

import {
  View,
  Text,
  AppRegistry
} from 'react-native';

const inputButtons = [
    ['C', 'CE'],
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
];

class ReactCalculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null,
            isDecimal: false,
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        );
    }

    _renderInputButtons() {
        let views = [];

        for (let r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (let i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                    <InputButton
                        value={input}
                        onPress={this._onInputButtonPressed.bind(this, input)}
                        key={r + "-" + i}/>
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }

    _handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue
        })
    }

    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;

            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;

            case 'CE':
                this.setState({
                    selectedSymbol: null,
                    previousInputValue: 0,
                    inputValue: 0,
                });
                break;

            case 'C':
                this.setState({
                    selectedSymbol: this.state.selectedSymbol,
                    previousInputValue: this.state.previousInputValue,
                    inputValue: 0,
                });
                break;

            case '.':
                if (this.state.isDecimal === false) {
                    this.setState({
                        selectedSymbol: this.state.selectedSymbol,
                        previousInputValue: this.state.previousInputValue,
                        inputValue: 0,
                    });
                }
                break;
        }
    }
}

export default ReactCalculator
