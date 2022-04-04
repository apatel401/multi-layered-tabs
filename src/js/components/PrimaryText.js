import React from 'react';
import { useContext } from 'react';
import { ContentCabinetContext } from './Provider';

function PrimaryText(props) {

  const context = useContext(ContentCabinetContext);
  const secondaryArrayLength = context.primaryCategories[props.id].secondaryCategories.length;

	return (
    <p 
      className="primary-cc-buttons"
      style={{
        background: `${context.primaryCategories[props.id].primaryBgColor}`,
        fontSize: `${context.fontSizePrimaryCategories.fontSizePrimaryCategories}px`,
        color: `${context.primaryFontColor.primaryFontColor}`,
    }}>
      {props.title}
    </p>
  );
}

export default PrimaryText;
