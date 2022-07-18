# %% imports
import pandas as pd
import datetime as date
from dotenv import dotenv_values
import tweepy

# %% read auth info
config = dotenv_values("../.env")

# %% connect to twitter

auth = tweepy.OAuthHandler(config['api_key'], config['api_key_secret'])
auth.set_access_token(config['access_token'], config['access_token_secret'])
api = tweepy.API(auth)

# %% time span
start_date = date.datetime.now()- date.timedelta(days=30)
end_date = date.datetime.now()

# %% create the df of all
tweets = tweepy.Cursor( api.user_timeline,
                        screen_name="elonmusk",
                        count = 200,
                        include_rts = False,
                        since=start_date,
                        until=end_date).items()

print(tweets)
json_data = [t._json for t in tweets]

df = pd.json_normalize(json_data)

# %%
