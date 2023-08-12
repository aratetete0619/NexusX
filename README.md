![NexusX Main Logo 800x600](https://github.com/aratetete0619/NexusX/assets/120061560/a770db3b-e51e-4ff6-843b-f1577fcd7ad3)


## What is NexusX?
"NexusX is more than an app – it's your personal knowledge explorer."<br>
<br>
Navigate through intricate connections, unravel the mysteries behind relationships, and unearth fascinating insights like never before. Whether you're examining the bonds between your favorite movie characters, investigating interactions between tech giants, or discovering hidden links on websites, NexusX opens a world of understanding at your fingertips. Share your findings with others or use the detailed visualizations to augment your presentations. Embrace the joy of discovery and see the world through a whole new lens with NexusX.




## Installation

NexusX is a web-based application and does not require any specific installation process.

## Usage

1. Access NexusX.
[![Image from Gyazo](https://i.gyazo.com/0101970389aab6d718fc0191d6befc7d.gif)](https://gyazo.com/0101970389aab6d718fc0191d6befc7d)

2. Enter the keyword you want to search in the search bar.
[![Image from Gyazo](https://i.gyazo.com/2f2414786ebbdf2604933e9f2c890fd7.gif)](https://gyazo.com/2f2414786ebbdf2604933e9f2c890fd7)

3. From the search results, select the "connection" you want to visualize.


4. 
6. A diagram visualizing the "connection" is displayed.
7. You can save the diagram or share it on social media.(In progress)

## Architecture

The workflow of the application is as follows:

1. **User Interaction**: When a user conducts a search, that request is sent to the backend via a GraphQL API.

2. **Data Retrieval and Analysis**: An Amazon EC2 instance crawls the specified web pages. It uses spaCy and GINZA to extract entities and their relationships from the text.

3. **Data Storage and Indexing**: The extracted information is stored in Neo4j and Elasticsearch indexes the newly extracted information.

4. **Data Searching and Retrieval**: When a user searches for a specific entity or relationship, the GraphQL API sends the appropriate search query to Elasticsearch.

5. **Graph Generation**: Relationships between entities are dynamically drawn using React.js.

6. **Predicting with Machine Learning**: Amazon SageMaker is used to predict new relationships between entities.(In progress)

7. **Feedback and Improvement**: User feedback is stored in Mysql and used to improve the system.

8. **Monitoring**: The operation of Elasticsearch is monitored with Kibana.(In progress)

9. **Sharing**: Users can share search results on social media.(In progress)

## Feedback

We value your feedback. If you encounter any problems or have suggestions, please send us your feedback [here](link for sending feedback).




