# DO2-Asset-Loader
Addon to load TangoTek's Decked Out 2 assets onto the Minecraft Bedrock Edition, for use in community map ports. <br>
All rights belong to TangoTek, MoselBop, Del Chupenebray, Joel Bickford, and all creators associated with Decked Out 2 in any form. <br>
This is a Community project for use in Community works without intent for monetization. <br>
This project MAY NOT be used for monetized contents.

### Card Sounds
Please see https://github.com/BoxOfDevs/DO2-Asset-Loader/tree/main/AvgZing%20Decked%20Out%202%20Asset%20Loader%20RP/sounds/ for a full list of available sounds. They are split into subfolders, but this is ignored in the in-game naming scheme. Some files have DO as a prefix, but the in-game naming scheme will use do2 for consistency. See below for examples.<br>
Cards can be played with /playsound do2.<cardname>, where spaces in the cardname are dots. For example, /playsound do2.adrenaline.rush, /playsound do2.avalanche, or /playsound do2.stumble. The same principle applies to all other individual sounds, such as /playsound do2.dungeontaunt.1. Capitalization is ignored.<br>
In instances where there are multiple versions of a sound, the number for the version is replaced with "random" and all sounds are randomized. EX: /playsound do2.clank.clankblocked.set1.4 becomes /playsound do2.clank.clankblocked.set1.random. The exception to this is the Ambient Deepfrost Drones, which are do2.ambient.drone.deepfrost.random, as well as both do2.ambient.drone.deepfrost.random1 and do2.ambient.drone.deepfrost.random2, where random includes all 18 tracks, while random 1 and random 2 each include only 9 to replicate the original game's 9 discs per dropper. <br>
<br>
As of version 1.1.0, sounds only play 16 blocks away and have falloff. This will be adjusted in a future version, but I wanted to get this out sooner than later, particularly as a proof of concept. <br> <br>
These will likely change to play 256 blocks away without falloff, so that they can be triggered by command blocks directly at their processors (such as the card processor) -- without needing to transfer the sounds to any centralized processing systems. It will not be hard to adjust this number based on community feedback, so please let me know if this should be raised or lowered at all.

## To-Do List:
- [X] Card Sounds Placeholder 
- [X] Event Sound Placeholders (Hazard, Clank, Heartbeat, Shulkers, Recycles, Purchases)
- [X] Atmospheric and Ambient Sound Placeholders
- [ ] Fix range and falloff of audio placeholders
- [ ] Cards as Unique Items (With textures and lore)
- [ ] Treasure and Misc. DO2 Items as Unique Items
- [ ] Shop Items as Helmets (to put on armor stands in shops)
- [ ] Animated Doors (Front Door and Lvl1 textures)
- [ ] Usage Guide
- [ ] Address Community Feedback
- [ ] FUTURE: Config? 