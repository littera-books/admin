import React from 'react';

// Styled
import Styled from './Popup.styled';

const Popup = () => (
  <Styled.PopupBackground>
    <Styled.PopupWrapper>
      <Styled.PopupHeader>
        <h1>
          <strong>header</strong>
        </h1>
        <button type="button">
          <strong>&times;</strong>
          &nbsp;
        </button>
      </Styled.PopupHeader>
      <Styled.PopupBody>
        <p>body</p>
      </Styled.PopupBody>
      <Styled.PopupFooter>
        <button type="button">Cancel</button>
        <button type="button">Confirm</button>
      </Styled.PopupFooter>
    </Styled.PopupWrapper>
  </Styled.PopupBackground>
);

export default Popup;
