import React from 'react';
import { useEffect, useRef, useContext } from 'react';
import { ContentCabinetContext } from './Provider';

function SecondaryCategory(props) {

    const focusRef = useRef();

	// get context
	const context = useContext(ContentCabinetContext);

	const primaryCategoryOfSubCategory = context.primaryCategories[context.primaryIndex].title

	//length of secondary category array
	const secondaryArrayLength = context.primaryCategories[context.primaryIndex].secondaryCategories.length;

	const handleShowContent = () => {
		context.updateContext({ secondaryIndex: props.id});
	};

	useEffect(() => {
		if(context.primaryIndex !== null && props.id === `${context.primaryCategories[context.primaryIndex
		].title}-0`){
			
			focusRef.current.focus();
		}
	},[context.primaryIndex])

	const secondaryBtnStyles = (e, addStyles) => {
		if (addStyles === "addStyles") {
			e.target.style.boxShadow =
				"0 0 0 3px" + context.primaryCategories[context.primaryIndex].primaryBgColor;
			e.target.style.border = "4px solid #eceff0";
		} else {
			e.target.style.border = "4px solid transparent";
			e.target.style.boxShadow = "0 0 0 3px transparent";
		}
	};
	const fontSize = {
		fontSize: `${context.fontSizeSecondaryCategories.fontSizeSecondaryCategories}px`,
	};

	return (
		<li className='secondary-list-item'>
			<button 
			ref={focusRef} 
			onClick={() => handleShowContent()} 
			className="secondary-cc-button"
			aria-label={`${props.title} ${props.index + 1} of ${secondaryArrayLength} sub-categories in ${primaryCategoryOfSubCategory}`}
			onFocus={(e) => secondaryBtnStyles(e, 'addStyles')}
			onBlur={(e) => secondaryBtnStyles(e)}
			onMouseEnter={(e) => secondaryBtnStyles(e, 'addStyles')}
			onMouseLeave={(e) => secondaryBtnStyles(e)}
			style={
				context.secondaryIndex === props.id
					? { 
						background: `${context.primaryCategories[context.primaryIndex].primaryBgColor}`, 
                  color: `${context.primaryFontColor.primaryFontColor}`,
                  ...fontSize
					   }
					:{ 
						background: `${context.primaryCategories[context.primaryIndex].secondaryBgColor}`,
                  color: `${context.secondaryFontColor.secondaryFontColor}`,
                  ...fontSize
					}
					
				}
				>
				{props.title}

			</button>
		</li>
	);
}

export default SecondaryCategory;
