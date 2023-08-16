CREATE DATABASE IF NOT EXISTS `nexusx`;
USE `nexusx`;
CREATE TABLE Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  icon_image VARCHAR(255),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  confirmation_code VARCHAR(255),
  confirmation_code_created_at TIMESTAMP,
  confirmed BOOLEAN DEFAULT FALSE
);
CREATE TABLE Groups (
  group_id INT AUTO_INCREMENT PRIMARY KEY,
  group_name VARCHAR(255) NOT NULL
);
CREATE TABLE UserGroups (
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (group_id) REFERENCES Groups(group_id)
);
CREATE TABLE UserNodes (
  user_id INT NOT NULL,
  node_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE UserScreenshots (
  user_id INT NOT NULL,
  screenshot_id INT AUTO_INCREMENT PRIMARY KEY,
  page_id INT NOT NULL,
  node_ids TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE Messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message_text TEXT NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES Users(user_id),
  FOREIGN KEY (receiver_id) REFERENCES Users(user_id)
);
CREATE TABLE NodeMedia (
  node_id VARCHAR(255) NOT NULL,
  media_id INT AUTO_INCREMENT PRIMARY KEY,
  media_type VARCHAR(255) NOT NULL,
  media_path VARCHAR(255) NOT NULL
);
CREATE TABLE Subscriptions (
  subscription_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE Tips (
  tip_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  node_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE UserFeedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  feedback_text TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE CrawlingMetadata (
  metadata_id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255) NOT NULL UNIQUE,
  timestamp TIMESTAMP NOT NULL,
  status VARCHAR(50) NOT NULL
);
CREATE TABLE SearchHistory (
  search_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  search_query TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE ShareData (
  share_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entity_id INT NOT NULL,
  social_media_platform VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE RecommendationData (
  recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entity_id INT NOT NULL,
  recommendation_score DECIMAL(5, 2) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE ModelPerformance (
  performance_id INT AUTO_INCREMENT PRIMARY KEY,
  model_id INT NOT NULL,
  performance_metric DECIMAL(5, 2) NOT NULL,
  timestamp TIMESTAMP NOT NULL
);
CREATE TABLE BiasMonitoring (
  bias_id INT AUTO_INCREMENT PRIMARY KEY,
  model_id INT NOT NULL,
  bias_metric DECIMAL(5, 2) NOT NULL,
  timestamp TIMESTAMP NOT NULL
);
CREATE TABLE NodeEvaluationScores (
  score_id INT AUTO_INCREMENT PRIMARY KEY,
  node_id INT NOT NULL,
  click_count INT NOT NULL DEFAULT 0,
  favorite_count INT NOT NULL DEFAULT 0,
  visualize_relations_count INT NOT NULL DEFAULT 0,
  score DECIMAL(5, 2) NOT NULL,
  last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE UserFavorites (
  user_id INT NOT NULL,
  media_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (media_id) REFERENCES NodeMedia(media_id)
);
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_usergroups_user_id ON UserGroups(user_id);
CREATE INDEX idx_usergroups_group_id ON UserGroups(group_id);
CREATE INDEX idx_usernodes_user_id ON UserNodes(user_id);
CREATE INDEX idx_userscreenshots_user_id ON UserScreenshots(user_id);
CREATE INDEX idx_userscreenshots_page_id ON UserScreenshots(page_id);
CREATE INDEX idx_messages_sender_id ON Messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON Messages(receiver_id);
CREATE INDEX idx_nodemedia_node_id ON NodeMedia(node_id);
CREATE INDEX idx_subscriptions_user_id ON Subscriptions(user_id);
CREATE INDEX idx_subscriptions_plan ON Subscriptions(plan);
CREATE INDEX idx_tips_user_id ON Tips(user_id);
CREATE INDEX idx_tips_node_id ON Tips(node_id);
CREATE INDEX idx_userfeedback_user_id ON UserFeedback(user_id);
CREATE INDEX idx_crawlingmetadata_url ON CrawlingMetadata(url);
CREATE INDEX idx_crawlingmetadata_status ON CrawlingMetadata(status);
CREATE INDEX idx_searchhistory_user_id ON SearchHistory(user_id);
CREATE INDEX idx_searchhistory_search_query ON SearchHistory(search_query(255));
CREATE INDEX idx_sharedata_user_id ON ShareData(user_id);
CREATE INDEX idx_sharedata_entity_id ON ShareData(entity_id);
CREATE INDEX idx_recommendationdata_user_id ON RecommendationData(user_id);
CREATE INDEX idx_recommendationdata_entity_id ON RecommendationData(entity_id);
CREATE INDEX idx_modelperformance_model_id ON ModelPerformance(model_id);
CREATE INDEX idx_biasmonitoring_model_id ON BiasMonitoring(model_id);
CREATE INDEX idx_nodeevaluationscores_node_id ON NodeEvaluationScores(node_id);
CREATE INDEX idx_userfavorites_user_id ON UserFavorites(user_id);
CREATE INDEX idx_userfavorites_media_id ON UserFavorites(media_id);
