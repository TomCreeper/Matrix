/*AsianBot v1.2
 *August 22, 2016
 *Programmed by Michael Cao (ASIANBOI)*/

var Discord = require("discord.js");
var bot = new Discord.Client({
  disableEveryone: true
});

var isCommander = ["143194991886467072", "171319044715053057", "176870986900045824", "213108782388084736", "180094452860321793", "171319044715053057"];

var prefix = "~";
var version = "1.1"
var whatsnew = "Google search! \nUPCOMING: Fun commands and more Google API tools!"

var initTBA = require('thebluealliance');
var tba = initTBA('node-thebluealliance', 'Node.js wrapper library for the TBA v2 API', '1.1.1');

var Cleverbot = require('cleverbot-node');
var cleverbot = new Cleverbot;

var google = require('google')

var chalk = require('chalk');
var server = chalk.bold.red;
var chan = chalk.bold.green;
var msg = chalk.yellow;
var usr = chalk.bold.blue;
var cmand = chalk.bgRed;
var gray = chalk.gray;

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "asianbot",
  password: "discordbot",
  database: "discordbot"
});
connection.connect();

fs = require('fs')
fs.readFile('token.txt', 'utf8', function (err,token) {
	if (err) {
		return console.log(err);
	}
	bot.loginWithToken(token);
});

bot.on('error', e => { console.error(e); });
bot.on('warn', e => { console.warn(e); });
bot.on('debug', e => { console.info(e); });

var replyTextToMentions = "Hi! I'm AsianBOT. Use " + prefix + "help to see a list of my commands.";

disableEveryone: true

/*var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    console.log("You entered: [" + 
        d.toString().trim() + "]");
	var input = d.toString().trim()
	bot.sendMessage("215965218449260544", input);
  });*/

bot.on("ready", function() {
	var str = "";
				var currentTime = new Date()
				var hours = currentTime.getHours()
				var minutes = currentTime.getMinutes()
				var seconds = currentTime.getSeconds()
				if (minutes < 10) {minutes = "0" + minutes}
				if (seconds < 10) {seconds = "0" + seconds}
				str += hours + ":" + minutes + ":" + seconds;
	console.log("Bot Online and Ready! On " + bot.servers.length + " Servers!");
	bot.sendMessage("214876995375464448", ":stopwatch: ``" + str + "`` :mega: AsianboiBOT is online and ready! :white_check_mark:");
	bot.setPlayingGame('~help | ' + bot.servers.length + " Servers")
});

bot.on('serverNewMember', function(server, user)
{
	if(server.id === "176186766946992128" || server.id === "209467012684972034" || server.id === "214850991089123328" || server.id === "215965218449260544")
	{
		bot.sendMessage(server.defaultChannel, ":wave: " + user.username + " joined the server.");
	}
});

bot.on('serverMemberRemoved', function(server, user)
{
	if(server.id === "176186766946992128" || server.id === "209467012684972034" || server.id === "214850991089123328" || server.id === "215965218449260544")
	{
		bot.sendMessage(server.defaultChannel, user.username + " left the server.");
	}
});

bot.on('userBanned', function(server, user)
{
	if(server.id === "176186766946992128" || server.id === "209467012684972034" || server.id === "214850991089123328" || server.id === "215965218449260544")
	{
		bot.sendMessage(server.defaultChannel, ":hammer: " +  user.username + " was banned.");
	}
});

bot.on("messageDeleted", function(message)
{
	try {
		console.log(server(message.sender.username + "'s message was deleted!\n Old message: " + message.content));
	}
	catch(err){
		console.log(server("ERR: MESSAGE NOT ARCHIVED"));
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.on("messageUpdated", function(message1, message2)
{
	if(message1.server.id != "110373943822540800")
	{
		console.log(server(message1.sender.username + "'s message was edited!\n Old message: " + message1.content));
		//bot.sendMessage(message1, message1.sender.username + "'s message was edited!\n Old message: " + message1.content);
	}
});

bot.on("serverDeleted", function(server) {
  console.log("Attempting to remove " + server.name + " from the database!");
  connection.query("DELETE FROM servers WHERE serverid = '" + server.id + "'", function(error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Server Removed!");
  })
})

bot.on("serverCreated", function(svr) {
	console.log("Trying to insert server " + svr.name + " into database");
	var info = {
	"servername": "'" + svr.name + "'",
	"serverid": svr.id,
	"ownerid": svr.owner.id,
	"prefix": "~"
	}

	connection.query("INSERT INTO servers SET ?", info, function(error) {
	if (error) {
		console.log(error);
		return;
	}
		console.log("Server Inserted!");
	})
  
	console.log(server("Bot added to " + svr.name));
	bot.sendMessage(svr.defaultChannel, "Hello! I'm AsianboiBOT. Someone invited me here. To view my commands do " +prefix+"help!\nGive me a role with manage roles, manage server, and administrator.");
});

bot.on("message", function(message) {	
	try
	{
		if(message.server.id != 110373943822540800)
		{
			    var str = "";
				var currentTime = new Date()
				var hours = currentTime.getHours()
				var minutes = currentTime.getMinutes()
				var seconds = currentTime.getSeconds()
				if (minutes < 10) {minutes = "0" + minutes}
				if (seconds < 10) {seconds = "0" + seconds}
				str += hours + ":" + minutes + ":" + seconds;
			console.log(gray("[" + str + "] ") + server(message.server) + " | " + chan(message.channel.name) + " | " + usr(message.sender.username) + ": " + msg(message.cleanContent));
		}	
	}
	catch(err)
	{
		    var str = "";
			var currentTime = new Date()
			var hours = currentTime.getHours()
			var minutes = currentTime.getMinutes()
			var seconds = currentTime.getSeconds()
			if (minutes < 10) {minutes = "0" + minutes}
			if (seconds < 10) {seconds = "0" + seconds}
			str += hours + ":" + minutes + ":" + seconds;
		console.log(gray("[" + str + "]") + server(" [PM] ") + usr(message.sender.name) + " : " + msg(message.cleanContent));
	}

	if(message.author.bot) return;
	
	if(message.content.startsWith(prefix + "google")){
		console.log(cmand(message.sender.username + " executed: google"));
		var search = message.content.split(" ").splice(1).join(" ");
		var nextCounter = 0;
		google.resultsPerPage = 5
		google(search, function (err, res){
			if (err){
				console.error(err)
				bot.sendMessage(message, "ERROR: Search failed");
			}
			
			var link = res.links[0];
			var title = link.title;
			var url = link.href;
			var desc = link.description;
			bot.sendMessage(message, "**Result: **" + title + "\n**Link: **" + url + "\n**Description: **" + desc);
		})
	}
	
	else if(message.content.startsWith(prefix + "whatsnew")){
		bot.sendMessage(message, "ASIANBOT " + version + ": " + whatsnew);
	}
	
	else if(message.content.startsWith(prefix + "talk")){
		console.log(cmand(message.sender.username + " executed: talk"));
		var cleverMessage = message.content.split(" ").splice(1).join(" ");
		
		Cleverbot.prepare(function(){
			cleverbot.write(cleverMessage, function (response) {
				bot.sendMessage(message, response.message);
			});
		});
	}
	
	else if(message.content.startsWith(prefix + "restart") && isCommander.indexOf(message.sender.id) > -1){
		bot.sendMessage(message, ":wave: ASIANBOT is restarting...\n*Windows XP shutdown sounds*");
		setTimeout(function () {bot.logout()}, 1000)		
		setTimeout(function () {process.exit()}, 2000)		
	}
	
	else if(message.content.startsWith (prefix + "user")) {
		if (message.content === prefix + "user"){
		
			console.log(cmand(message.sender.username + " executed: user"));
			bot.sendMessage(message,
			"Name: " + message.sender.username + 
			"\nDiscriminator: " + message.sender.discriminator + 
			"\nID: " + message.sender.id + 
			"\nCreated: " + message.sender.createdAt + 
			"\nStatus: " + message.sender.online + 
			"\n" + message.sender.avatarURL);
		}
		else if (message.content.startsWith (prefix + "user"))
		{
			console.log(cmand(message.sender.username + " executed: user"));
			var user = message.mentions[0];
			bot.sendMessage(message,
			"Name: " + user.username + 
			"\nDiscriminator: " + user.discriminator + 
			"\nID: " + user.id + 
			"\nCreated: " + user.createdAt + 
			"\nStatus: " + user.online + 
			"\n" + user.avatarURL);
		}
    }
	
	else if(message.content ===(prefix + "server")) {
		console.log(cmand(message.sender.username + " executed: server"));
		bot.sendMessage(message,
		"Server: " + message.server.name + 
		"\nOwner: " + message.server.owner.name + 
		"\nCreated: " + message.server.createdAt + 
		"\nRegion: " + message.server.region + 
		"\nServer ID: " + message.server.id + 
		"\nMembers: " + message.server.members.length + 
		"\nChannels: " + message.server.channels.length + 
		"\nRoles: " + message.server.roles.map(r=>r.name).join(", ") + 
		"\n" + message.server.iconURL);
	}
    
	
	else if(message.content.startsWith (prefix + "servers")) {
		console.log(cmand(message.sender.username + " executed: servers"));
		bot.sendMessage(message, "Servers: " + bot.servers.length);
	}
	
	else if(message.content.startsWith(prefix + "mute")) {
		if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander")) || isCommander.indexOf(message.sender.id) > -1)
		{
			var user = message.mentions[0];
			console.log(cmand(message.sender.username + " executed: mute against " + user.name));
			try
			{
				bot.addMemberToRole(user.id, message.server.roles.get("name", "muted"));
				bot.reply(message, ": " + user + " has been muted.");
				var reason = message.content.split(" ").splice(2).join(" ")
				bot.sendMessage(message, "ACTION: MUTE\nUSER: " + user.username + "\nReason: " + reason + "\nModerator: " + message.author.username);
			}
			catch(err)
			{
				bot.reply(message, "ERROR: Role muted does not exist. Please make a role called muted that cannot talk in the server.");
			}
		}
		else
		{
			bot.reply(message, "U NO BOT COMMANDER!!!");
		}
    }
	
	else if(message.content.startsWith (prefix + "unmute")) {
		if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander")) || isCommander.indexOf(message.sender.id) > -1)
		{
			var user = message.mentions[0];
			console.log(cmand(message.sender.username + " executed: unmute against " + user.name));
			try
			{
				bot.removeMemberFromRole(user.id, message.server.roles.get("name", "muted"));
				bot.reply(message, ": " + user + " has been unmuted.");
			}
			catch(err)
			{
				bot.reply(message, "ERROR: Member is not muted");
			}
		}
		else
		{
			bot.reply(message, "U NO BOT COMMANDER!!!");
		}
    }

    else if(message.content.startsWith (prefix + "ban")) {
		if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander")) || isCommander.indexOf(message.sender.id) > -1)
		{
			if(msg.mentions.length === 1){
            for(var user of msg.mentions){
                bot.banMember(user, msg.server);
				console.log(cmand(message.sender.username + " executed: ban against " + user.name));
				bot.reply(message, user + " has been banned.");
                return;
            }}
		}
		else
		{
			bot.reply(message, "U NO BOT COMMANDER!!!");
		}
    }
	
	else if(message.content.startsWith (prefix + "kick")) {
		if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander")) || isCommander.indexOf(message.sender.id) > -1)
		{
			if(msg.mentions.length === 1){
            for(var user of msg.mentions){
                bot.kickMember(user, msg.server);
				console.log(cmand(message.sender.username + " executed: kick against " + user.name));
				bot.reply(message, user + " has been kicked.");
                return;
            }}
		}
		else
		{
			bot.reply(message, "U NO BOT COMMANDER!!!");
		}
    }
	
	else if(message.sender.id === "171319044715053057"  || isCommander.indexOf(message.sender.id) > -1)
	{
		if(message.content === prefix + "type") {
			console.log(cmand(message.sender.username + " executed: type"));
			bot.startTyping(message.server.id);
		}
		
		if(message.content === prefix + "stoptype") {
			console.log(cmand(message.sender.username + " executed: stoptype"));
			bot.stopTyping(message.server.id);
		}
		
		if(message.content.startsWith(prefix + "setgame")) {
			var game = message.content.split(" ").splice(1).join(" ");
			console.log(cmand(message.sender.username + " executed: setgame"));
			bot.setPlayingGame(game);
			bot.reply(message, "Successfully set game to " + game);
		}
	}
	
	else if(message.content.startsWith (prefix + "warn")) {
		if (bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander")) || isCommander.indexOf(message.sender.id) > -1)
		{
			var user = message.mentions[0];
			console.log(cmand(message.sender.username + " executed: warn against " + user.name));
			bot.sendMessage(message, user + ": You have been warned for breaking a server rule!");
		}
		else
		{
			bot.reply(message, "U NO BOT COMMANDER!!!");
		}
    }
	
	else if(message.content === "<@204301419828871168> What's your prefix?")
	{
		if(message.author.bot) return;
		else bot.reply(message, replyTextToMentions);
	}
	
	else if(message.content === prefix + "git") {
			console.log(cmand(message.sender.username + " executed: git"));
			bot.reply(message, "Check out my GitHub at https://github.com/asianboiFRC/AsianBot (Music function not included)")
	}
	
	else if(message.content.startsWith(prefix + "sudosay"))
	{
		if(message.sender.id === "171319044715053057" || isCommander.indexOf(message.sender.id) > -1)
		{
			console.log(cmand(message.sender.username + " executed: sudosay"));
			var sudosay = message.content.split(" ").splice(1).join(" ");
			bot.sendMessage(message, sudosay);
			bot.deleteMessage(message);
		}
    }
	
	else if(message.content.startsWith(prefix + "spam"))
	{
		if(message.sender.id === "171319044715053057" || isCommander.indexOf(message.sender.id) > -1)
		{
			console.log(cmand(message.sender.username + " executed: spam"));
			var spam = message.content.split(" ").splice(1).join(" ");
			bot.sendMessage(message, spam);
			bot.sendMessage(message, spam);
			bot.sendMessage(message, spam);
			bot.sendMessage(message, spam);
			bot.deleteMessage(message);
		}
    }
	
	else if(message.content.startsWith(prefix + "sudoinvite"))
	{
		if(message.sender.id === "171319044715053057" || isCommander.indexOf(message.sender.id) > -1)
		{
			console.log(cmand(message.sender.username + " executed: sudoinvite"));
			const serverToInvite = message.content.split(" ").splice(1).join(" ");
			bot.createInvite(bot.servers.get("name", serverToInvite).generalChannel, {
				maxAge: 60,
				maxUses: 1
			})
			.then(i => {
				bot.sendMessage(message.author, i + "");
			});
		}
	}
	
	else if(message.content.startsWith(prefix + "say")) {
		console.log(cmand(message.sender.username + " executed: say"));
		var say = message.content.split(" ").splice(1).join(" ");
		bot.reply(message, say);
    }
	
	else if(message.content.startsWith(prefix + "stats")) {
		console.log(cmand(message.sender.username + " executed: stats"));
		bot.sendMessage(message, "Stats for ASIANBOIBOT: \n``" + bot.users.length + " Users\n" + bot.channels.length + " Channels\n" + bot.servers.length + " Servers``");
    }
	
	else if(message.content === prefix + "help") {
		console.log(cmand(message.sender.username + " executed: help"));
        bot.sendMessage(message, 
		"AsianBOT " + version + " (IN DEVELOPMENT)\nCommand list: git, ping, invite, help, stats, say, server, user, talk." + 
		"\nFOR BOT COMMANDERS: warn, ban, verify, mute, unmute" + 
		"\nFOR ADMINS: eval, type, stoptype, sudosay, sudoinvite" +
		"\nMusic Commands: summon, play, np, disconnect, queue, clear, clean, restart, search, resume, skip, pause, setname, setnick, shuffle" + 
		"\nType ~license for the software license." + 
		"\nCheck out my server at https://discord.gg/scfs8Bx");
    }
	
	else if(message.content === prefix + "license"){
		bot.sendMessage(message,"ASIANBOT - THE DISCORD BOT" +
		"\nCopyright (C) 2016 ASIANBOI/Michael Cao" + 
		"\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version."+
		"\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details."+
		"\nYou should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.");
	}
	
	if(message.content === "AsianboiBOT What's your prefix?") {
		console.log(cmand(message.sender.username + " executed: prefix"));
        bot.sendMessage(message, "Hello, my prefix is " + prefix);
    }
	
    else if(message.content === prefix + "ping") {
            var start = new Date(message.timestamp).getTime();
            bot.sendMessage(message, "Pong!", (error, botMessage) => {
                var end = new Date(botMessage.timestamp).getTime();
                bot.updateMessage(botMessage, "Pong! | took " + (end - start) + "ms.");
			});
    }
	
	else if(message.content === prefix + "invite") {
		console.log(cmand(message.sender.username + " executed: invite"));
        bot.sendMessage(message, "Invite me here: https://discordapp.com/oauth2/authorize?client_id=204301371518746624&scope=bot");
    }
	
	else if(message.content === prefix + "verify")
	{
		try
		{
			console.log(cmand(message.sender.username + " executed: verify"));
			if(message.sender.id === "171319044715053057")
			{
				bot.sendMessage(message, message.sender.username + " :white_check_mark: Verified! Hello ASIANBOI.");
			}
			if(isCommander.indexOf(message.sender.id) > -1)
			{
				bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as a bot admin!");
			}
			else if(message.sender === message.server.owner)
			{
				bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as the server owner!");
			}
			else if(bot.memberHasRole(message.author, message.server.roles.get("name", "Bot Commander")))
			{
				bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as a Bot Commander.");
			}
			else if(message.sender.id === "183678606705164288")
			{
				bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as someone who likes poutine :D.");
			}
			else
			{
				bot.sendMessage(message, message.sender.username + " :white_check_mark: You have been verified as: Nobody");
			}
		}
		catch(err)
		{
			bot.sendMessage(message, "ERROR: ERROR IN ~VERIFY");
		}
	}
	
	else if(message.content.startsWith(prefix + "eval")){
    // Checks to see whos sending message (so bad people cant hack bot)
		console.log(server(message.sender.username + " executed: eval"));
		if(message.sender.id === "171319044715053057"  || isCommander.indexOf(message.sender.id) > -1){
			// gets code to run
			var code = message.content.split(" ").splice(1).join(" ");
			
			try {
				if (code.startsWith(prefix + "eval bot.internal.token") || code.startsWith(prefix + "eval eval"))
				{
					bot.sendMessage(message, "You're not getting my token");
				}
				else
				{
					bot.sendMessage(message, "Code: ``" + code + "``\nOutput: ``"+eval(code)+"``");
				}
			} 
			catch(err) {
				bot.sendMessage(message, "Error: "+err);
			}
        }
		else{
            bot.sendMessage(message, "You do not have permission to use this command");
        }
    }
});


//STONEMONEY CODE
bot.on('message', function(message) {
	// Get help
	if (message.content === 'TBA HELP') {
		bot.sendMessage(message, 'https://github.com/StoneMoney/FIRSTbot/wiki');
	}
	// Get team name
	(message.content.match(/^TBA TEAM \d+/im) || []).forEach(function(match) {
		tba.getTeamById(match.slice(9), function(err, team_info) {
			if (!err) bot.sendMessage(message, team_info.nickname || team_info.name || 'Team not found');
		});
	});
	// Get team location
	(message.content.match(/^TBA LOCATE ([0-9]+)/im) || []).forEach(function(match) {
		tba.getTeamById(match.slice(0), function(err, team_info) {
			if (!err) bot.sendMessage(message, team_info.location || 'Location/Team not found');
		});
	});
});