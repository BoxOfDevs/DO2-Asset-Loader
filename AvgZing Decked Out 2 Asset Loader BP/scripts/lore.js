import { system, world, ItemStack } from '@minecraft/server';
import * as GameTest from "@minecraft/server-gametest";

// Lore System for Decked Out 2 Artifacts
class loreItem {
    constructor(itemId, lore) {
        this.itemId = itemId;
        this.lore = lore;
    }
}

// Establish items to set lore for, to be executed in the runInterval
const ItemArray = [
    new loreItem("minecraft:diamond_sword", ["§bTestExcited Blade"]),
    new loreItem("bridge:adequatemug", ["§5Drinking from this enlarged chalice is said to", "cause confusion, stuttering, and", "loss of perception."]),
    new loreItem("bridge:anoldfriendspickaxe", ["§5Worn down through years of use,", "this artifact will never be forgotten."]),
    new loreItem("bridge:axeofthevoid", ["§5A legendary axe that never", "stops shredding."]),
    new loreItem("bridge:butchersapron", ["§5A bloody apron for the venerable gentleman."]),
    new loreItem("bridge:chiseloftheundeadsculptress", ["§5This macabre device bestows unlimited creativity", "and sarcasm to its wielder. Mostly sarcasm."]),
    new loreItem("bridge:crookofthepinkshepherd", ["§5Honestly... Nobody really knows", "what this thing does."]),
    new loreItem("bridge:deathloop", ["§5Causes an neverending stream of comical deaths."]),
    new loreItem("bridge:doggoneshades", ["§5Eye protection worthy of a king."]),
    new loreItem("bridge:gemofgreatness", ["§5This gem truly is great."]),
    new loreItem("bridge:goathorns", ["§5Grants untold knowledge of", "ancient, wondrous technologies"]),
    new loreItem("bridge:gogglesofsymmetry", ["§5Grants deceptively overpowering combat prowess.", "Also quite fashionable."]),
    new loreItem("bridge:goldeneye", ["§5iMazing 'I' iNsribed iNside"]),
    new loreItem("bridge:hiddenstash", ["§5Hidden inside you'll find an assortment", "of spoons and dapper upper lip hair."]),
    new loreItem("bridge:hoodofawyeh", ["§5Wearing this hood may cause", "uncontrollable giggling."]),
    new loreItem("bridge:hypnoticbandanna", ["§5Gaze in Wonder. It seems to look back at you."]),
    new loreItem("bridge:jarofswiftslime", ["§5Drink to become an unkillable speedster!", "*Infinite totems not included"]),
    new loreItem("bridge:knightshelm", ["§5Yep. It's knightly. Well and good."]),
    new loreItem("bridge:lorebook", ["§5An infinite source of transparant wisdom."]),
    new loreItem("bridge:lunarpearl", ["§5Infused with strange alien powers,", "this pearl can keep anything clean."]),
    new loreItem("bridge:multigrainwaffle", ["§5Often misspelled. Never duplicated."]),
    new loreItem("bridge:omegaeyeofdoombig", ["§5Also Omega. Probably Mega as well."]),
    new loreItem("bridge:pappaslippers", ["§5Sweet faces to take you sweet places"]),
    new loreItem("bridge:pocketwatchofshreep", ["§5Perfect sleeping every time."]),
    new loreItem("bridge:rocketship", ["§5Let's GO!"]),
    new loreItem("bridge:skadoodler", ["§5A unique device capable of creating", "unlimited -ificators. Most won't work."]),
    new loreItem("bridge:themasterskey", ["§5What could it possibly open?"]),
    new loreItem("bridge:tntslab", ["§5The one that started it all.", "Accept no substitutes"]),
    new loreItem("bridge:wandofgorgeousness", ["§5Makes Everything gorgeous. Of course."]),
    new loreItem("bridge:do2_hood", ["§5Enthrall the DM to do your bidding for one run!"]),
];
// Use system to execute code every tick or after delays
// Checks inventories for items within the earlier-set array
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const playerContainer = player.getComponent("inventory").container
        for (let i = 0; i < playerContainer.size; i++) {
            const item = playerContainer.getItem(i);
            const findLore = ItemArray.find(x => x.itemId == item?.typeId);
            const lore = item?.getLore();
            if (!findLore || !item || lore?.length != 0) continue
            item.setLore(findLore.lore);
            playerContainer.setItem(i, item);
        }
    }
}, 1);

const simulatedplayerName = "§dDecked Out Helper§r"; // Separated for easier future changes if applicable

// Subscribe to events to run code when specific in game actions occur
// Decked Out Map Holder System: Spawn Simulated Player each time the Real Player re-enters the world
world.afterEvents.playerSpawn.subscribe((eventData) => {
    const do2sender = eventData.player;
    if (eventData.initialSpawn) { // Make sure it's the player spawning into the world, rather than dying
        do2sender.runCommandAsync("execute positioned -510 64 1794 run tag @a[rm=5] add Trusted");
        if (do2sender.hasTag("Trusted")) {
            const simplayers = world.getPlayers({ name: simulatedplayerName });
            if (!(simplayers[0])) { // Making sure multiple simulated players don't spawn
                do2sender.runCommandAsync("fill 1000001 -60 1000001 999998 319 1000003 air");
                do2sender.runCommandAsync("execute positioned 1000000 -60 1000000 run gametest run do2:spawn_simulated_player");
            }
        }
    }
})
// Decked Out Map Holder System: Register a gametest to spawn a simulated player at -510 64 1794
GameTest.register("do2", "spawn_simulated_player", (test) => {
    const simulatedplayer = test.spawnSimulatedPlayer({ "x": -510, "y": 64, "z": 1794 }, simulatedplayerName, 1); // Location, Name, Gamemode. 1 is Creative.
    simulatedplayer.runCommandAsync('tp @s -510 63 1794'); // Just in case it spawns elsewhere, move to correct location
    simulatedplayer.runCommandAsync("structure load spawn_simulated_player ~~~") // Give it the correct map to hold as an item
    simulatedplayer.runCommandAsync("gamerule randomtickspeed 1"); // Gametests set this to 0. Reset to 1 when gametest starts.
    simulatedplayer.runCommandAsync("gamerule doDaylightCycle true") // Gametests set this to false. Reset to true when gametest starts.
    simulatedplayer.runCommandAsync("gamerule playerssleepingpercentage 1") // Realms set this to 100. Reset to 1 when gametest starts.
    simulatedplayer.runCommandAsync("gamerule commandblockoutput false") // Realms set this to true. Reset to false when gametest starts.
    test.print("The Decked Out Map Holder has been spawned!");

   /* world.afterEvents.chatSend.subscribe((eventData) => { // Create test succeed condition
        if (eventData.message == "!do2map remove") {
            test.print("Decked Out Map Holder has been removed!");
            simulatedplayer.kill();
            test.succeed();
        }
    }); */

    world.beforeEvents.playerLeave.subscribe(({player}) => { // Remove simplayer in BDS / Realms, multiplayer compatible
        const { dimension } = player;
        const simplayers = world.getPlayers({ excludeNames: [simulatedplayerName, player.name] });
        if (!(simplayers[0])) {
        system.run(() => {
            dimension.runCommand(`gametest stopall`);
        });
        }
    });

})
    .maxTicks(1000 * 72000) // Fallback: Kill gametest after 1000 hours
    .structureName("do2:spawn_simulated_player")

// See more at https://wiki.bedrock.dev/scripting/script-server.html

// https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/blockinventorycomponent

// Experimenting with Self-Refilling Treasure Droppers

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
    if (entity.typeId === "minecraft:item") { // Confirm entity spawned is an item and get its dimension and location
        const itemStack = entity.getComponent("item").itemStack;
        const { dimension, location } = entity;

        // The item is still an entity when it's travelling through blocks, so this position is guaranteed immediately after ejecting
        if (dimension.getBlock({ x: location.x, y: location.y - 1, z: location.z }).typeId === "minecraft:dropper") {
            const dropperinv = dimension.getBlock({ x: location.x, y: location.y - 1, z: location.z }).getComponent("inventory").container;
            // world.sendMessage(itemStack.typeId + " was found 1 block above a dropper") // Debug Message

            // Begin cycling through items to re-insert
            if (itemStack.typeId.includes("coin")) {
                dropperinv.addItem(new ItemStack("bridge:do_coin", 1));
            } else if (itemStack.typeId.includes("ember")) {
                dropperinv.addItem(new ItemStack("bridge:do_ember", 1));
            } else if (itemStack.typeId.includes("crown")) {
                dropperinv.addItem(new ItemStack("bridge:do_crown", 1));
            } else if (itemStack.typeId.includes("key1")) {
                dropperinv.addItem(new ItemStack("bridge:do_key1_64", 1));
            } else if (itemStack.typeId.includes("key4")) {
                dropperinv.addItem(new ItemStack("bridge:do_key4_64", 1));
            } else if (itemStack.typeId.includes("key6")) {
                dropperinv.addItem(new ItemStack("bridge:do_key6_64", 1));
            } else if (itemStack.typeId.includes("toolbox")) {
                dropperinv.addItem(new ItemStack("bridge:toolbox", 1));
            } else if (itemStack.typeId.includes("pumpkin")) {
                // world.sendMessage("Pumpkin found!")
                const pumpkin = new ItemStack("minecraft:pumpkin", 1);
                pumpkin.nameTag = "§5❄☠ Halloween Pumpkin ☠❄";
                dropperinv.addItem(pumpkin);
            } else if (itemStack.typeId.includes("bomb")) {
                dropperinv.addItem(new ItemStack("bridge:bomb", 1));
            }
        }
    }
});