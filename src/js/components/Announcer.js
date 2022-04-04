import React, { useContext } from 'react';
import { ContentCabinetContext } from './Provider';

export const Announcer = (props) => {

    const context = useContext(ContentCabinetContext);

    let messageContent = props.message;

    const message = () => {
        switch(messageContent[0]) {
            case 'contentDisplayed':

                let messageString = '';

                if (messageContent[3]) {
                    messageString += `skipped to ${messageContent[4]} category, ${messageContent[4]} has 
                        ${context.primaryCategories[context.primaryIndex].secondaryCategories.length} subcategories`
                }

                messageString += `content for sub-category ${messageContent[1]} displayed below;  Content reads: ${messageContent[2]}`
                
                return messageString;
            
            case 'homePage':
                return `homepage for interactive activity displaying ${messageContent[1]} primary categories`;
            default:
                return;
        }
    }

    // aria-live region for announcements
    return (
        <div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
            {message()}
        </div>
    );
}
export default Announcer;
