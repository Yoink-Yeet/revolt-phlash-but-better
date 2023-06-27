import Command from "../Command";

export default new Command(
  "ban",
  {
    description: "Bans a member from the server.",
    permissions: [Permissions.BanMembers],
  },
  async (bot, message, args) => {
    if(!message.server || !message.member) return;
    
    const memberID = args.string(1),
      member = message.server.members.fetch(memberID),
      user = await bot.users.fetch(member?.id || memberID);
      
    if(member?.id == bot.user.id) return message.reply("You want me to ban myself? How sad.");
    
    if(member && !member.bannable) return message.reply("I can't ban this member.");
    
    if(member && !member.inferiorTo(message.member)) return message.reply("You are not high enough to ban this member.");
    
    await message.server.members.ban(member || memberID);
    
    message.channel.send(`Successfully banned ${user?.username || "user"}.`);
  }
);
