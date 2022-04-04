import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ContentCabinetContext } from './Provider';

function MainContent(props) {
    // get context
    const context = useContext(ContentCabinetContext);

    const [htmlToDisplay, setHtmlToDisplay] = useState(null);

    const handleHtmlContent = (dataStr) => {
        const subCategoryTitle = context.primaryCategories[context.primaryIndex].secondaryCategories[props.index].title;
        const innerText = dataStr.replace(/(<([^>]+)>)/ig, '');
        
        context.updateContext({
            htmlFileContent: { ...context.htmlFileContent, ["'" + props.id + "'"]: dataStr },
            ariaLiveArray: ['contentDisplayed', subCategoryTitle, innerText, context.cardSkipped, context.primaryCategories[context.primaryIndex].title],
            cardSkipped: false
        })

        setHtmlToDisplay(dataStr);
    }

    useEffect(() => {

        if (!props.url)
            return;
        
        if (!context.htmlFileContent.hasOwnProperty(props.id)) {
            fetch(eval("'" + props.url + "'"))
            .then(response => response.text()) // setting the data to a text string
            .then(data => {
                if (context.secondaryIndex === props.id) {
                    handleHtmlContent(data);
                }
            });
        } else {
            handleHtmlContent(context.htmlFileContent[props.id]);
        }

    }, [ context.secondaryIndex ]);

    return (
        <>
            {
                context.secondaryIndex !== null && context.secondaryIndex === props.id && props.url !== null &&
                    (<div dangerouslySetInnerHTML={{ __html: htmlToDisplay }}></div>)                
            }
        </>
    )
}

export default MainContent;