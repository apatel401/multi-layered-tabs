import React from 'react';
import { useContext } from 'react';
import PrimaryCategory from './PrimaryCategory';
import PrimaryText from './PrimaryText'
import SecondaryCategory from './SecondaryCategory';
import MainContent from './MainContent';
import { ContentCabinetContext } from './Provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';

function ContentCabinet(props) {
  // get context
	const context = useContext(ContentCabinetContext);
  
	const handleBackToHomepage = () => {
		context.updateContext({
      primaryIndex: null,
      ariaLiveArray: ['homePage', context.primaryCategories.length]
    });
	};

	const maxIndex = context.primaryCategories.length - 1;
	let newPrimaryIndex = context.primaryIndex;
	
  const handleNextButton = () => {
		if(context.primaryIndex < maxIndex){
			newPrimaryIndex = context.primaryIndex + 1;
		} else {
			newPrimaryIndex = 0;
		}
    context.updateContext({
      'primaryIndex': newPrimaryIndex, 
      //secondaryIndex is a unique string formatted with the primary 
      // and index of the matching secondary category eg, (Continents-0)
      'secondaryIndex':`${context.primaryCategories[newPrimaryIndex].title}-${0}`, 
      cardSkipped: true
    });
	}

	const handlePreviousButton = () => {
		if (context.primaryIndex > 0) {
			newPrimaryIndex = context.primaryIndex - 1;
    } else if (context.primaryIndex === 0 ) {
			newPrimaryIndex = maxIndex;
		}
    context.updateContext({
      'primaryIndex': newPrimaryIndex, 
      //secondaryIndex is a unique string formatted with the primary 
      // and index of the matching secondary category eg, (Continents-0)
      'secondaryIndex': `${context.primaryCategories[newPrimaryIndex].title}-${0}`,
      cardSkipped: true
    });
	}

  let ariaLabel;

	const handleAriaLabelNext = () => {
		if (context.primaryIndex !== null) {
			const nextCategory = context.primaryIndex + 1; 
      if (context.primaryIndex === 0) {
        ariaLabel = context.primaryCategories[1].title;
        return `skip to ${ariaLabel} category`;
      } else if (nextCategory < context.primaryCategories.length) {
			  ariaLabel = context.primaryCategories[nextCategory].title;
        return `skip to ${ariaLabel} category`;
			} else if (nextCategory === context.primaryCategories.length) {
			  ariaLabel = context.primaryCategories[0].title;
        return `skip to ${ariaLabel} category`;
      };
    };
	};

  const handleAriaLabelPrev = () => {
		if (context.primaryIndex !== null) {
			const prevCategory = context.primaryIndex - 1;
      if (prevCategory === -1) {
        const finalCategory = context.primaryCategories.length - 1;
        ariaLabel = context.primaryCategories[finalCategory].title;
        return `skip to ${ariaLabel} category`;
      } else if (prevCategory >= 0) {
			  ariaLabel = context.primaryCategories[prevCategory].title;
        return `skip to ${ariaLabel} category`;
			};
    };
	};

  // map through primary categories and return a component for each
	const _primaryCategories = context.primaryCategories.map((category, index) => {
		return <PrimaryCategory id={index} title={category.title} fontSizePrimaryCategories={context.fontSizePrimaryCategories} />;
	});

  const _primaryCategoriesText = context.primaryCategories.map((category, index) => {
		return <PrimaryText id={index} title={category.title} fontSizePrimaryCategories={context.fontSizePrimaryCategories} />;
	});

  // Enter/exit message
	const iloStart = "content-cabinet" + props.id + "-iloStart";
  const _iloStartElement =
    (<div className="skip-link-container">
      <span ref={context.startLine} tabIndex={-1} className="sr-only">
        {context.iloStartText}
      </span>
      <a 
        className="skip-interactive-link"
        onClick={(e) => {e.preventDefault(); context.bottomLine.current.focus();}}
        onKeyPress={(e) => {e.preventDefault(); context.bottomLine.current.focus();}}
        ref={context.skipLine}
        tabIndex={0}
      >
        {context.iloStartLink}
      </a>
    </div>);
    
  const _iloEndElement = 
    (<div className="skip-link-container">
      <a
        className="return-interactive-link"
        onClick={(e) => {e.preventDefault(); context.startLine.current.focus();}}
        onKeyPress={(e) => {e.preventDefault(); context.startLine.current.focus();}}
        ref={context.endLine}
        tabIndex={0}
      >
        {context.iloEndLink}
      </a>
      <span ref={context.bottomLine} tabIndex={-1} className="sr-only">
        {context.iloEndText}
      </span>
    </div>);

	return (
    <div className="content-cabinet-container" id={iloStart}>
      { _iloStartElement }
      <div className="home-bar">
        <button
          className='home-button'
          aria-label="return to main menu to view all categories"
          onClick={handleBackToHomepage}
          style={
            context.primaryIndex !== null
              ? { display: "block"}
              : { display: "none" }
          }
        >
          <FontAwesomeIcon icon={faHome} className="fa-2x" focusable="true" />
        </button>
      </div>

      <div className="primary-category-container">
        <button
          className="cc-carousel cc-previous"
          aria-label={handleAriaLabelPrev()}
          onClick={handlePreviousButton}
          style={
            context.primaryIndex !== null
              ? { display: "block"}
              : { display: "none" }
          }
        >
          <FontAwesomeIcon icon={faChevronLeft} className="fa-2x" />
        </button>
          {context.primaryIndex !== null ? (
            _primaryCategoriesText[context.primaryIndex]
          ) : (
            <ul className="primary-menu">
              {_primaryCategories}
            </ul>
          )}

        <button
          className="cc-carousel cc-next"
          aria-label={handleAriaLabelNext()}
          onClick={handleNextButton}
          style={
            context.primaryIndex !== null
              ? { display: "block"}
              : { display: "none" }
          }
        >
          <FontAwesomeIcon icon={faChevronRight} className="fa-2x" />
        </button>
      </div>

			<div className="secondary-category-container">
				<ul className='secondary-menu'>
					{
            context.primaryIndex !== null &&
					  context.primaryCategories[context.primaryIndex].secondaryCategories.map((secondaryCategory, index) => (
							<SecondaryCategory
                //secondaryIndex is a unique string formatted with the primary 
                // and index of the matching secondary category eg, (Continents-0)
								id={`${context.primaryCategories[context.primaryIndex].title}-${index}`}
                index={index}
								title={secondaryCategory.title}
								content={secondaryCategory.content}
							/>
					  ))
          }
				</ul>
			</div>

      {context.primaryIndex !== null ? (
        <div className="main-content">
          {
            context.primaryIndex != null &&
            context.primaryCategories[context.primaryIndex].secondaryCategories.map((secondaryCategory, index) => (
              <MainContent
                id={`${context.primaryCategories[context.primaryIndex].title}-${index}`}
                index={index}
                content={secondaryCategory.content}
                url={secondaryCategory.url}
              />
            ))}
        </div>
      ) : null}
        {_iloEndElement}
    </div>
  );
}

export default ContentCabinet;
