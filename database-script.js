//--------------------CREATE---------------
use("Project")
db.dropDatabase()
use("Project")

//Users
db.users.insertOne({user_id:"user1",username:"user1_username",email:"user1@example.com",password:"user1_password",profile_picture:"user1.jpg",last_active:"2023-20-10",registration_date:"2023-01-01",following:["user2","user3"],followers:["user2","user3"]});
db.users.insertMany([{user_id:"user2",username:"user2_username",email:"user2@example.com",password:"user2_password",profile_picture:"user2.jpg",last_active:"2010-20-10",registration_date:"2023-01-02",following:["user1","user3"],followers:["user1","user3"]},{user_id:"user3",username:"user3_username",email:"user3@example.com",password:"user3_password",profile_picture:"user3.jpg",last_active:"2010-20-10",registration_date:"2023-01-03",following:["user1","user2"],followers:["user1","user2"]},{user_id:"user4",username:"user4_username",email:"user4@example.com",password:"user4_password",profile_picture:"user4.jpg",last_active:"2010-20-10",registration_date:"2023-01-04",following:["user1","user2","user3"],followers:["user1","user2","user3"]}]);

//Posts
db.posts.insertOne({post_id:"post20",user_id:"user1",publish_date:"2023-01-05",URL:"post1.jpg",type:"image",title:"Post1",description:"Thisisthefirstpost.",comments:[{comment_text:"Nicepost!",user_id:"user2",timestamp:"2023-01-06"}],likes:{user_ids_who_liked:["user2"],like_dates:["2023-01-06"]}});
db.posts.insertMany([{post_id:"post1",user_id:"user1",publish_date:"2023-01-05",URL:"post1.jpg",type:"image",title:"Post1",description:"Thisisthefirstpost.",comments:[{comment_text:"Nicepost!",user_id:"user2",timestamp:"2023-01-06"}],likes:{user_ids_who_liked:["user2"],like_dates:["2023-01-06"]}},{post_id:"post2",user_id:"user2",publish_date:"2023-01-07",URL:"post2.jpg",type:"image",title:"Post2",description:"Anotherpost.",comments:[],likes:{user_ids_who_liked:[],like_dates:[]}},{post_id:"post3",user_id:"user3",publish_date:"2023-01-08",URL:"post3.jpg",type:"text",title:"TextPost",description:"Thisisatextpost.",comments:[{comment_text:"Interesting!",user_id:"user1",timestamp:"2023-01-09"},{comment_text:"Iagree!",user_id:"user2",timestamp:"2023-01-10"}],likes:{user_ids_who_liked:["user1","user2"],like_dates:["2023-01-09","2023-01-10"]}},{post_id:"post4",user_id:"user1",publish_date:"2023-01-09",URL:"post4.jpg",type:"video",title:"VideoPost",description:"Checkoutthisvideo!",comments:[{comment_text:"Amazingvideo!",user_id:"user3",timestamp:"2023-01-10"}],likes:{user_ids_who_liked:["user3"],like_dates:["2023-01-10"]}}]);

//Groups
db.groups.insertOne({group_id:"group1",group_name:"Group1",description:"Thisisgroup1",admin_id:"user1",members:["user1","user2"],created_date:"2023-01-04",posts:["post1"]});
db.groups.insertMany([{group_id:"group2",group_name:"Group2",description:"Thisisgroup2",admin_id:"user2",members:["user2","user3"],created_date:"2023-01-05",posts:["post2","post3"]},{group_id:"group3",group_name:"Group3",description:"Thisisgroup3",admin_id:"user3",members:["user1","user3"],created_date:"2023-01-06",posts:["post4"]}]);

//Messages 
db.messages.insertOne({sender:"user1",receiver:"user2",message_content:"Hello,user2!",timestamp:"2023-01-03",message_status:"sent"});
db.messages.insertMany([{sender:"user1",receiver:"user3",message_content:"Hey,user3!Howareyou?",timestamp:"2023-01-04",message_status:"sent"},{sender:"user3",receiver:"user1",message_content:"Hi,user1!I'mdoingwell,thanks!",timestamp:"2023-01-04",message_status:"sent"},{sender:"user2",receiver:"user3",message_content:"Hello,user3!Anyplansfortheweekend?",timestamp:"2023-01-05",message_status:"sent"},{sender:"user3",receiver:"user2",message_content:"Notsureyet!Maybeamovienight.Howaboutyou?",timestamp:"2023-01-05",message_status:"sent"}]);



//---------------------READ-----------------

//Users
db.users.find({ profile_picture: { $exists: true } });
db.users.find({ $expr: { $gt: [{ $size: "$following" }, 4] } });
db.users.find({ following: "user1" });
db.users.find({ user_id: "user3" });

//Posts
db.posts.find({ comments: { $elemMatch: { user_id: "user2" }}});
db.posts.find({ user_id: "user1", "comments.0": { $exists: true } });
db.posts.find({ $where: "this.likes.user_ids_who_liked.length > 3" });
db.posts.find({user_id: "user1"})

//Groups
db.groups.find({ $expr: { $gt: [{ $size: "$members" }, 1] } });
db.groups.find({ created_date: { $gt: "2017-01-05" } });
db.groups.find({ admin_id: "user2" });
db.groups.find({ group_id: "group2" });

//Messages
db.messages.find({ sender: "user1", receiver: "user2" });
db.messages.find({ timestamp: "2023-01-03" });
db.messages.find({ sender: "user1" });
db.messages.find({ message_status: "sent" });



//--------------------UPDATE----------------

//Users
db.users.updateOne({ user_id:"user4"},{$set:{email:"bob@gmail.com"}});
db.users.updateMany({user_id:{$in:["user3", "user1"]}},{$addToSet:{followers:{$each:["user3", "user4"]}}});

//Posts
db.posts.updateOne({post_id:"post20"},{$set:{description:"Updateddescriptionforthefirstpost."}});
db.posts.updateMany({post_id: { $in: ["post1", "post2"]}},{$set:{description:"now"}});

//Groups
db.groups.updateOne({admin_id:"user3"},{$push:{members:{$each:["user3", "user4"]}}});
db.groups.updateMany({group_id:{$in:["group2", "group3"]}},{ $set:{ description: "Updated description for the group."}});

//Messages 
db.messages.updateOne({sender: "user1", receiver: "user2"},{$set:{message_content: "Updated message content."}});
db.messages.updateMany({ },{ $set: { message_content: "Updated message content for all messages." }});
  


//--------------------DELETE----------------

//Users
var fiveYearsAgo = new Date();
fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

db.users.deleteMany({last_active: {$lt: fiveYearsAgo.toISOString()}});
db.users.deleteOne({user_id: "user1"});

//Posts
db.posts.deleteMany({user_id: "user1", post_id: "post1"})
db.posts.updateOne({ post_id: "post3" },{ $pull: { comments: { user_id: "user1" }}});

//Groups
db.groups.updateOne({ group_id: "group2" },{ $pull: { members: "user3" }});
db.groups.deleteMany({ $expr: { $lt: [{ $size: "$members" }, 2]}});

//Messages 
var thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

db.messages.deleteMany({timestamp:{ $lt: thirtyDaysAgo.toISOString()}});
db.messages.deleteOne({sender: "user1", receiver: "user3"});

//Database
db.dropDatabase()

//-------------------Aggreations----------------

//Users
//Find Users with the Most Posts:
db.users.aggregate([{$lookup:{from: "posts",localField: "user_id", foreignField: "user_id", as: "user_posts" } },{ $project: { username: 1, post_count: { $size: "$user_posts" } } },{ $sort: { post_count: -1 } },{ $limit: 5 }]);

//Count the Number of Followers for Each User:
db.users.aggregate([{ $project: { user_id: 1, followers_count: { $size: "$followers" }}}]);


//Posts
//Count the Number of Comments on Each Post:
db.posts.aggregate([{ $project: { post_id: 1, comment_count: { $size: "$comments" } } }]);

//Find Posts with the Most Likes:
db.posts.aggregate([{ $project: { post_id: 1, like_count: { $size: "$likes.user_ids_who_liked" } } },{ $sort: { like_count: -1 } },{ $limit: 5 }]);


//Groups
//Find the Most Active Group (with the highest number of posts):
db.groups.aggregate([{ $lookup: { from: "posts", localField: "posts", foreignField: "post_id", as: "group_posts" } },{ $project: { group_id: 1, group_name: 1, post_count: { $size: "$group_posts" } } },{ $sort: { post_count: -1 } },{ $limit: 1 }]);

//List Members Count for Each Group:
db.groups.aggregate([{ $project: { group_id: 1, group_name: 1, member_count: { $size: "$members" } } }]);


//Messages
//Count the Number of Sent and Received Messages for Each User:
db.messages.aggregate([{ $facet: { sent_messages: [{ $match: { sender: "user1" } }, { $count: "sent_count" }],received_messages: [{ $match: { receiver: "user1" } }, { $count: "received_count" }]}},{ $project: { sent_count: { $ifNull: ["$sent_messages.sent_count", 0] }, received_count: { $ifNull: ["$received_messages.received_count", 0] } } }]);

//Count the Number of Messages Exchanged between Each User Pair:
db.messages.aggregate([{ $group: { _id: { sender: "$sender", receiver: "$receiver" }, message_count: { $sum: 1 } } },{ $project: { sender: "$_id.sender", receiver: "$_id.receiver", message_count: 1, _id: 0 } }]);


