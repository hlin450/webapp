
#!/bin/bash
token="patLOTFMojBBXhCEr.7be0db23aad8ffa59aef56de86ad85c4ae379de818f47a515eea9ad303962195"
baseId="appbWMhKH8Qs0uMgb"
#Cafe
tableId="tblD3lmNdq8ggFPuG"

#Gym 
tableId2="tblVS0CkmOgEvttMM"

#Parks
tableId3="tblxeoFfq957i8QRy"

#Restaurants
tableId4="tblKjAt0vj4jAXxs8"

curl https://api.airtable.com/v0/appbWMhKH8Qs0uMgb/${tableId4} \
-H "Authorization: Bearer ${token}"

