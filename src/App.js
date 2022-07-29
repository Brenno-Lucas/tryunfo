import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cardItems: [],
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.enableButton();
    });
  }

  enableButton = () => {
    const maxValueSumAttr = 210;
    const maxValueAttr = 90;
    const { cardName, cardImage, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardRare } = this.state;
    const buttonIsDisabled = cardName.length === 0
    || cardDescription.length === 0
    || cardImage.length === 0
    || cardRare.length === 0
    || Number(cardAttr1) > maxValueAttr
    || Number(cardAttr1) < 0
    || Number(cardAttr2) > maxValueAttr
    || Number(cardAttr2) < 0
    || Number(cardAttr3) > maxValueAttr
    || Number(cardAttr3) < 0
    || Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > maxValueSumAttr;
    this.setState({
      isSaveButtonDisabled: buttonIsDisabled,
    });
  }

  onSaveButtonClick = () => {
    const { cardName, cardImage, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardRare, cardTrunfo, cardItems } = this.state;
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardItems: [...cardItems, {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo }],
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }, () => {
      if (cardTrunfo) {
        this.setState({
          hasTrunfo: true,
        });
      }
    });
  };

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, isSaveButtonDisabled, hasTrunfo, cardItems } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
        />
        <div>
          <h1>Cartas</h1>
          { cardItems[0] ? cardItems.map((param, i) => (
            <Card
              key={ i }
              cardName={ param.cardName }
              cardDescription={ param.cardDescription }
              cardAttr1={ param.cardAttr1 }
              cardAttr2={ param.cardAttr2 }
              cardAttr3={ param.cardAttr3 }
              cardImage={ param.cardImage }
              cardRare={ param.cardRare }
              cardTrunfo={ param.cardTrunfo }
            />
          ))
            : cardItems }
        </div>
      </div>
    );
  }
}

export default App;
