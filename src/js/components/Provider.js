import React from 'react';
import { useState, useRef, createContext } from 'react';
import Announcer from './Announcer';

export const ContentCabinetContext = createContext();

export default function ProviderComponent(props) {
	const fontSizePrimaryCategories = { fontSizePrimaryCategories: props.config.fontSizePrimaryCategories };
	const fontSizeSecondaryCategories = { fontSizeSecondaryCategories: props.config.fontSizeSecondaryCategories };
	const primaryFontColor = { primaryFontColor: props.config.primaryFontColor };
	const secondaryFontColor = { secondaryFontColor: props.config.secondaryFontColor };
	const primaryBgColor = { primaryBgColor: props.config.primaryCategories.primaryBgColor };
	const secondaryBgColor = { secondaryBgColor: props.config.primaryCategories.secondaryBgColor };

	const contextInformation = {
		...JSON.parse(JSON.stringify(props.config)),

		fontSizePrimaryCategories: fontSizePrimaryCategories,
		fontSizeSecondaryCategories: fontSizeSecondaryCategories,
		primaryFontColor: primaryFontColor,
		secondaryFontColor: secondaryFontColor,
		primaryBgColor: primaryBgColor,
		secondaryBgColor: secondaryBgColor,
		primaryIndex: null,
		secondaryIndex: 0,
		skipLine: useRef(null),
        endLine: useRef(null),
        startLine: useRef(null),
        bottomLine: useRef(null),
        ariaLiveArray: [],
        htmlFileContent: {},
        cardSkipped: false,
		updateContext: (contextUpdates) => {
			setContextInfo((currentContextInfo) => {
				let setAnnouncer = contextUpdates.hasOwnProperty("ariaLiveArray") ||
					(contextUpdates.hasOwnProperty("secondaryIndex") &&
						contextUpdates.secondaryIndex === currentContextInfo.secondaryIndex);

				!setAnnouncer && (contextUpdates.ariaLiveArray = []);

				return {
					...currentContextInfo,
					...contextUpdates,
					makeAnnouncement: setAnnouncer,
				};
			});
		},
	};

	const [ contextInfo, setContextInfo ] = useState(contextInformation);
   

	return (
      <ContentCabinetContext.Provider value={contextInfo}>
         <Announcer 
            message={contextInfo.ariaLiveArray} 
            key={contextInfo.makeAnnouncement && Math.random().toString(36).slice(2, 10)}
         />
         {props.children}
      </ContentCabinetContext.Provider>
	);
}
