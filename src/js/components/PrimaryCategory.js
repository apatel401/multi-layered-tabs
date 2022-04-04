import React from 'react';
import { useContext } from 'react';

import { ContentCabinetContext } from './Provider';

function PrimaryCategory(props) {
	// get context
	const context = useContext(ContentCabinetContext);

	const secondaryArrayLength = context.primaryCategories[props.id].secondaryCategories.length;
  
	const handleShowSecondary = () => {
    
		context.updateContext(
      { primaryIndex: props.id, 
        //secondaryIndex is a unique string formatted with the primary 
        // and index of the matching secondary category eg, (Continents-0)
        secondaryIndex:`${context.primaryCategories[props.id].title}-${0}`
      });
	};

  	const primaryBtnStyles = (e, addStyles) => {
		if(addStyles === 'addStyles'){
      e.target.style.boxShadow =
      "0 0 0 3px" + context.primaryCategories[props.id].primaryBgColor;
      e.target.style.border = "4px solid #eceff0";
		}else{
			e.target.style.border = 'none';
			e.target.style.boxShadow = 'none';
		}
	}

	return (
    <li className="primary-list-item">
      <button
        aria-label={
          context.primaryIndex !== null
            ? `${props.title} has ${secondaryArrayLength} sub-categories`
            : `${props.title}; ${props.id + 1} of ${
                context.primaryCategories.length
              } categories`
            }
        className="primary-cc-buttons"
        disabled={context.primaryIndex}
        onClick={() => handleShowSecondary()}
        style={{
          background: `${context.primaryCategories[props.id].primaryBgColor}`,
          fontSize: `${context.fontSizePrimaryCategories.fontSizePrimaryCategories}px`,
          color: `${context.primaryFontColor.primaryFontColor}`,
        }}
        onMouseEnter={(e) => primaryBtnStyles(e,'addStyles')}
        onFocus={(e) => primaryBtnStyles(e,'addStyles')}
        onMouseLeave={(e) => primaryBtnStyles(e)}
        onBlur={(e) => primaryBtnStyles(e)}
      >
        {props.title}
      </button>
    </li>
  );
}

export default PrimaryCategory;
