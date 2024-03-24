
// let prompt = `Create an iternary to explore Mumbai for 3 days. I do not have accommodation booked. As a active traveler, I am looking forward to experiencing the local culture, cuisine, and attractions. My budget for this trip is $4000. I prefer to use train to explore the city. For breakfast, lunch, dinner and brunch provide me specific restaurants along with locations for that restaurant, dont give generic locations like "dinner at local restaurant", etc. Also provide 3 tips while travelling which will help my travel. Give a response in this format.
// {   
//     tips:[
//         {
//             "Travel tip1": ""
//         },
//         {
//             "Travel tip2": ""
//         },
//         {
//             "Travel tip3": ""
//         },
//     ]
//     iternary:[
//         {
//             "Day": 1,
//             "Itinerary": [
//               {
//                 "Time": "",
//                 "Activity": "",
//                 "Info": ""
//               },
//               {
//                 "Time": "",
//                 "Activity": "",
//                 "Info": "",
//                 "AverageCost": ""
//               }
//             ]
//         },
//         {},{},...

//     ]

// }`
const prompt = (promptInfo) => {
    return `Create an itinerary to explore ${promptInfo.city} for ${promptInfo.days} days. I do not have accommodation booked. As a ${promptInfo.type}, I am looking forward to experiencing the local culture, cuisine, and attractions. My budget for this trip is ${promptInfo.budget}. I prefer to use ${promptInfo.transportType} to explore the city. For breakfast, lunch, dinner, and brunch, provide specific restaurants along with their locations. Also, provide 3 tips while traveling that will help my travel. Also, provide a short overview of the city.  Below is the format of response
    {
        "result": {
            "TravelData": [
                {
                    "Day": "1",
                    "Itinerary": [
                        {
                            "Time": "",
                            "Activity": "",
                            "Info": "",
                            "AverageCost": ""
                        },
                        {
                            "Time": "",
                            "Activity": "", 
                            "Info": "",
                            "AverageCost": ""
                        }
                    ]
                }, {}, {}....
            ]
    }
    `
}
const prompt2 = (promptInfo) => {
    return ` Write tips and overview for visting ${promptInfo.city}
    {
        "result": {
                    "Overview": "",
                    "Tips": [
                        {
                            "TravelTips1": ""
                        },
                        {
                            "TravelTips2": ""
                        },
                        {
                            "TravelTips3": ""
                        }
                    ],
                }
    }
    `
}

module.exports = {
    prompt,
    prompt2
}



