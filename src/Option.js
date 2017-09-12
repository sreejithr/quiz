import React, { Component } from 'react';

function getOptionLetter(i) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return alphabet[i%26].toUpperCase();
}

export default Option = ({ option, index, onClick }) => (
    <div onClick={() => onClick(getOptionLetter(index))} style={styles.option}>
      <span style={styles.key}>{getOptionLetter(index)}</span>
      <span>{option}</span>
    </div>  
);

const styles = {
  key: {
    fontSize: 14,
    padding: '3px 6px',
    color: 'rgb(18, 121, 91)',
    backgroundColor: 'white',
    borderRadius: 3,
    marginRight: 10,
  },
  option: {
    marginBottom: 10,
  },
};
