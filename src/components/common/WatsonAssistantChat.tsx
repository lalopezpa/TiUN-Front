// Import type React from 'react';
// import {useEffect} from 'react';

// declare global {
//   type WatsonAssistantChatOptions = {
//   	integrationId: string;
//   	region: string;
//     serviceInstanceId: string;
//     onLoad: (instance: any) => void;
//   };

//   interface Window {
//   	watsonAssistantChatOptions: WatsonAssistantChatOptions;
//   }
// }

// const WatsonAssistantChat: React.FC = () => {
// 	useEffect(() => {
// 		const script = document.createElement('script');
// 		script.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js';
// 		script.async = true;
// 		document.head.appendChild(script);

// 		script.onload = () => {
// 			window.watsonAssistantChatOptions = {
// 				integrationId: '5b859bb1-bd6c-4d25-a730-9b425c08f717',
// 				region: 'au-syd',
// 				serviceInstanceId: '4d73066b-eef2-4338-9d83-a28d57b247ab',
// 				onLoad: function(instance) { instance.render(); }
// 			};
// 		};

// 		return () => {
// 			document.head.removeChild(script);
// 		};
// 	}, []);
// };

// export default WatsonAssistantChat;
