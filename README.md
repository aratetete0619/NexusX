# NexusX

NexusX is an application that allows users to visually explore various connections. It visualizes relationships between movie or drama characters, external links of websites, interactions between celebrities, or ties between technologies. These visualizations can be used for sharing and creating presentation materials.

## Installation

NexusX is a web-based application and does not require any specific installation process.

## Usage

1. Access NexusX.
2. Enter the keyword you want to search in the search bar.
3. From the search results, select the "connection" you want to visualize.
4. A diagram visualizing the "connection" is displayed.
5. You can save the diagram or share it on social media.

## Architecture

The workflow of the application is as follows:

1. **User Interaction**: When a user conducts a search, that request is sent to the backend via a GraphQL API.

2. **Data Retrieval and Analysis**: An Amazon EC2 instance crawls the specified web pages. It uses spaCy and GINZA to extract entities and their relationships from the text.

3. **Data Storage and Indexing**: The extracted information is stored in Neo4j and DynamoDB, and Elasticsearch indexes the newly extracted information.

4. **Data Searching and Retrieval**: When a user searches for a specific entity or relationship, the GraphQL API sends the appropriate search query to Elasticsearch.

5. **Graph Generation**: Relationships between entities are dynamically drawn using Three.js and React.js.

6. **Predicting with Machine Learning**: Amazon SageMaker is used to predict new relationships between entities.

7. **Feedback and Improvement**: User feedback is stored in DynamoDB and used to improve the system.

8. **Monitoring**: The operation of Elasticsearch is monitored with Kibana.

9. **Sharing**: Users can share search results on social media.

## Feedback

We value your feedback. If you encounter any problems or have suggestions, please send us your feedback [here](link for sending feedback).




