'use strict';
const app=document.querySelector('#app');
let cards=[],state=null,activeMission=null,selectedMatchTurnLimit=50,ART={assets:{},superstars:{}},STARTERS={starters:[]},STARTER_MAP={},BOOSTERS={products:[]},ORIGINAL_MISSIONS={missions:[]},ORIGINAL_CAMPAIGN={missions:[]},AI_DECKS={decks:[]};
let ORIGINAL_SCRIPT_ASTS={};
const CONSOLIDATED_CARD_ID_MAP={"OriginalMomentumAgility":"AgilityTourn","Agility2E":"AgilityTourn","AgilityEX1":"AgilityTourn","AgilityEX2":"AgilityTourn","OriginalVariant_AgilityEX3":"AgilityTourn","OriginalMomentumKnowledge":"KnowledgeTourn","Knowledge2E":"KnowledgeTourn","KnowledgeEX1":"KnowledgeTourn","KnowledgeEX2":"KnowledgeTourn","OriginalVariant_KnowledgeEX3":"KnowledgeTourn","OriginalMomentumStrength":"StrengthTourn","Strength2E":"StrengthTourn","StrengthEX1":"StrengthTourn","StrengthEX2":"StrengthTourn","OriginalVariant_StrengthEX3":"StrengthTourn","OriginalMomentumStrike":"StrikeTourn","Strike2E":"StrikeTourn","StrikeEX1":"StrikeTourn","StrikeEX2":"StrikeTourn","OriginalVariant_StrikeEX3":"StrikeTourn","OriginalMomentumTechnical":"TechnicalTourn","Technical2E":"TechnicalTourn","TechnicalEX1":"TechnicalTourn","TechnicalEX2":"TechnicalTourn","OriginalVariant_TechnicalEX3":"TechnicalTourn","ArmDragTakedown":"Original_ArmDragTakedown2E","OriginalVariant_DoubleLegTakedown":"DoubleLegTakedown2E","Chop":"OriginalVariant_ChopPromo","OriginalVariant_BellyToBellySuplex":"BellyToBellySuplex2E","FlyingWheelKick":"Original_FlyingWheelKick2E","Original_PowerfulClothesline":"Lariat2E","OriginalVariant_ThrowOverTheRopes":"ThrowOverTheRopes2E","PumpHandleSlam":"Original_PumpHandleSlamEX2","OriginalVariant_WhipIntoSteelSteps":"WhipIntoSteelSteps2E","WraparoundNeckbreaker":"Original_WraparoundNeckbreakerEX1","Original_StratusfactionLE":"Stratusfaction","SuperMomentumLE":"OriginalVariant_SuperMomentum","OriginalVariant_DragonSleeper":"DragonSleeper2E","FigureFour":"FigureFour2E","FrogSplash":"FrogSplash2E","LegGrapevine":"LegGrapevine2E","Lionsault":"Lionsault2E","MountedPunches":"MountedPunches2E","NeckVice":"NeckVice2E","SentonSplash":"SentonSplash2E","ShootingStarPress":"ShootingStarPress2E","TheFinalCut":"TheFinalCut2E","TheLastRide":"TheLastRide2E","Original_special1":"AchillesHeel2EV095","BigandNastyV095":"BigandNastyEX1V095","BigDogInTheYardV095":"BigDogInTheYard2EV095","BigDogInTheYardEX1V095":"BigDogInTheYard2EV095","BounceOffTheRopesV095":"BounceOffTheRopes2EV095","BreakV095":"Break2EV095","DistractTheReferee2EV095":"DistractTheRefereeTournV095","DVonV095":"DVonEX2V095","EverythingHurtsV095":"EverythingHurts2EV095","HelloV095":"HelloNWOV095","HeSawThatComingV095":"HeSawThatComing2EV095","HookTheLegV095":"HookTheLegX8V095","Original_AttitudeStarMafiaKick":"Original_TheBigBootEX2","Original_ChokeslamToHell2E":"Original_ChokeslamToHellTourn","Original_CripplerCrossFace":"Original_CripplerCrossFaceTourn","Original_CripplerCrossFace2E":"Original_CripplerCrossFaceTourn","Original_DropTheHammer":"Original_DropTheHammerEX1","Original_Edgecution2E":"Original_EdgecutionTourn","Original_FlatOfTheFoot":"Original_FlatOfTheFoot2E","Original_HogansBigBoot2ELE":"Original_HogansBigBoot2E","Original_HogansLegDrop2E":"Original_HogansLegDropTourn","Original_HogansLegDrop2ELE":"Original_HogansLegDropTourn","Original_MafiaKick":"Original_MafiaKick2E","Original_Pedigree":"Original_PedigreeTourn","Original_Pedigree2E":"Original_PedigreeTourn","Original_PowerBomb":"Original_PowerBomb2E","Original_ArmDragCounter":"Original_ArmDragCounterTourn","Original_Block":"Original_BlockTourn","Original_Dodge2E":"Original_DodgeTourn","Original_Duck2E":"Original_DuckTourn","Original_RegalStretch":"Original_RegalStretchEX1","Original_RicFlairsFigureFourLE":"Original_RicFlairsFigureFour","Original_Shove":"Original_ShoveTourn","Original_Shove2E":"Original_ShoveTourn","Original_StandingSwitch2E":"Original_StandingSwitchTourn","Original_StratusphereLE":"Original_Stratusphere","Original_TrishsRoundhouseKickLE":"Original_TrishsChop","Original_UpAndOver2E":"Original_UpAndOverTourn","Original_RockBottom2E":"Original_RockBottomTourn","RussianLegSweep":"RussianLegSweep2E","DDTEX1":"DDT2E","SpinningHeelKickCore":"SpinningHeelKick2E","OriginalExact_BookerT":"OriginalExact_BookerTEX2","OriginalExact_ScissorsKick":"OriginalExact_ScissorsKickEX2","OriginalExact_Spineroonie":"OriginalExact_SpineroonieEX2","OriginalExact_BubbaRayDudley":"OriginalExact_BubbaRayDudleyEX2","OriginalExact_RefBump":"OriginalExact_RefBump2E","OriginalExact_BackSuplexEX1":"OriginalExact_BackSuplex2E","OriginalExact_WithAuthority":"OriginalExact_WithAuthority2E","OriginalExact_HollywoodHulkHoganLE":"OriginalExact_HollywoodHulkHogan2E","OriginalExact_JeffHardy":"OriginalExact_JeffHardyEX2","OriginalExact_RicFlairEX3LE":"OriginalExact_RicFlairEX3","OriginalExact_RobVanDam":"OriginalExact_RobVanDamEX2","OriginalExact_SpinningHeelKickEX2":"OriginalExact_StepOverHeelKickEX2","OriginalExact_VanDaminator":"OriginalExact_VanDaminatorEX2","OriginalExact_AnotherAttitudeStar":"OriginalExact_TestEX2","OriginalExact_TheHurricaneLE":"OriginalExact_TheHurricane","OriginalExact_TheRock2E":"OriginalExact_TheRock2EnoLE","OriginalExact_TrishStratusEX3LE":"OriginalExact_TrishStratusEX3","Original_StoneColdStunner_Core":"OriginalExact_StoneColdStunnerEX1"};
function canonicalCardId(id){
  let current=id,guard=0;
  while(CONSOLIDATED_CARD_ID_MAP[current]&&guard++<10)current=CONSOLIDATED_CARD_ID_MAP[current];
  return current;
}
function migrateConsolidatedCardRefs(value){
  if(Array.isArray(value))return value.map(migrateConsolidatedCardRefs);
  if(value&&typeof value==='object'){
    const migrated={};
    for(const [key,raw] of Object.entries(value)){
      const nextKey=canonicalCardId(key);
      const nextValue=migrateConsolidatedCardRefs(raw);
      if(Object.prototype.hasOwnProperty.call(migrated,nextKey)&&
         typeof migrated[nextKey]==='number'&&typeof nextValue==='number'){
        migrated[nextKey]+=nextValue;
      }else{
        migrated[nextKey]=nextValue;
      }
    }
    return migrated;
  }
  return typeof value==='string'?canonicalCardId(value):value;
}
const VERSION='v0.9.178',MAX_HP=40,HAND_SIZE=5,MAX_MOM=99,DEFAULT_MATCH_TURN_LIMIT=50,MIN_MATCH_TURN_LIMIT=20,MAX_MATCH_TURN_LIMIT=150,MATCH_TURN_LIMIT_STEP=10,STORE='wa-mobile-v0943',BACKUP_STORE='wa-mobile-backup-v0953';
const MOM_TYPES=['Agility','Knowledge','Strength','Strike','Technical','Attitude'];

// Canonical runtime card lookup. Several deck/recommendation screens and the
// startup recommendation builder depend on this helper being available before
// data loading completes.
function cardById(id){
  const key=String(id??'');
  return cards.find(card=>String(card.id)===key)||null;
}

const AUDIO={unlocked:false,music:null,crowd:null};
const ENTRANCE_AUDIO={austin:'StoneColdMusic',rock:'TheRock2EMusic',tripleh:'TripleH2EMusic',undertaker:'TheUndertaker2EMusic',kane:'Kane',angle:'KurtAngle',jericho:'ChrisJericho2EMusic',benoit:'ChrisBenoit',bigshow:'TheBigShowMusic',bookert:'BookerTMusic',edge:'EdgeMusic',christian:'ChristianMusic',eddie:'EddieGuerreroMusic',rvd:'SomethingsComing',flair:'Whoo',hogan:'HollywoodHulkHogan2EMusic',nash:'NewWorldOrderMusic',jeffhardy:'HardyzMusic',matthardy:'HardyzMusic',lita:'LitaMusic',trish:'TrishStratusMusic',bubba:'DudleyzMusic',dvon:'DudleyzMusic',spike:'SpikeDudleyMusic',bradshaw:'BradshawMusic',goldust:'GoldustMusic',lancestorm:'LanceStormMusic',rikishi:'Rikishi',scotty:'Scotty2HottyMusic',tajiri:'TajiriMusic',tazz:'Tazz',test:'TestMusic',hurricane:'TheHurricaneMusic'};
function audioSettings(){ensureProfile();return profile.settings||{}}
function audioPath(name){return `assets/audio/${name}.opus`}
function unlockAudio(){AUDIO.unlocked=true;document.removeEventListener('pointerdown',unlockAudio,true)}
document.addEventListener('pointerdown',unlockAudio,true);
function playSfx(name,volume=.75){if(!AUDIO.unlocked||!audioSettings().sound)return;try{const a=new Audio(audioPath(name));a.volume=Math.max(0,Math.min(1,volume*(audioSettings().sfxVolume??1)));a.play().catch(()=>{});return a}catch{}}
function stopMusic(){if(AUDIO.music){AUDIO.music.pause();AUDIO.music=null}}
function playMusic(name,{loop=true,volume=.42}={}){if(!AUDIO.unlocked||!audioSettings().music)return;stopMusic();try{const a=new Audio(audioPath(name));a.loop=loop;a.volume=Math.max(0,Math.min(1,volume*(audioSettings().musicVolume??1)));AUDIO.music=a;a.play().catch(()=>{});return a}catch{}}
function playCrowd(){if(!AUDIO.unlocked||!audioSettings().sound)return;if(AUDIO.crowd){AUDIO.crowd.pause()}try{const a=new Audio(audioPath('Crowd'));a.loop=true;a.volume=.18*(audioSettings().sfxVolume??1);AUDIO.crowd=a;a.play().catch(()=>{})}catch{}}
function stopCrowd(){if(AUDIO.crowd){AUDIO.crowd.pause();AUDIO.crowd=null}}
document.addEventListener('click',e=>{if(e.target.closest('button')&&audioSettings().sound)playSfx('MenuPress',.4)},true);

const SUPERSTARS={"austin":{"key":"austin","name":"STONE COLD STEVE AUSTIN","ability":"You draw a page when you play a Damage special with a move that connects.","abilityText":"You draw a page when you play a Damage special with a move that connects.","entrance":"Original Entrance","hp":70,"style":"balanced","sourceFile":"stsa.gac","starterId":"Starter-StoneCold","momentumMaximums":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1},"headShotArt":"","playbookArt":"StoneColdPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"rock":{"key":"rock","name":"THE ROCK","ability":"Special: The People","abilityText":"Special: The People\r\nDraw two pages. Use this ability once per game.","entrance":"Original Entrance","hp":70,"style":"technical","sourceFile":"TheRock.gac","starterId":"Starter-TheRock","momentumMaximums":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":2},"headShotArt":"","playbookArt":"Sales-TheRock.gai","abilityImplemented":true,"passiveImplemented":false},"tripleh":{"key":"tripleh","name":"TRIPLE H","ability":"Special: Be The Game","abilityText":"Special: Be The Game\r\nName a page. That page is drawn from your Playbook and put into your hand. Use this ability once per game.","entrance":"Original Entrance","hp":70,"style":"agile","sourceFile":"TripleH.gac","starterId":"TripleHStarter","momentumMaximums":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"Sales-HHH.gai","abilityImplemented":true,"passiveImplemented":false},"undertaker":{"key":"undertaker","name":"THE UNDERTAKER","ability":"The first five times your opponent counters one of your moves that cost 6 or more to play,","abilityText":"The first five times your opponent counters one of your moves that cost 6 or more to play, you draw a page.","entrance":"Original Entrance","hp":73,"style":"technical","sourceFile":"TheUndertaker.gac","starterId":"Starter-TheUndertaker","momentumMaximums":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":2},"headShotArt":"","playbookArt":"TheUndertakerPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"kane":{"key":"kane","name":"KANE","ability":"Kane takes -1 damage from Impact moves and ignores the first Stun he receives.","abilityText":"Kane takes -1 damage from Impact moves and ignores the first Stun he receives.","entrance":"Original Entrance","hp":75,"style":"agile","sourceFile":"Kane.gac","starterId":"Starter-Kane","momentumMaximums":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1},"headShotArt":"","playbookArt":"Sales-Kane.gai","abilityImplemented":true,"passiveImplemented":true},"angle":{"key":"angle","name":"KURT ANGLE","ability":"At the start of turns 1 and 20, Kurt Angle gets +1 Knowledge.","abilityText":"At the start of turns 1 and 20, Kurt Angle gets +1 Knowledge.","entrance":"Original Entrance","hp":67,"style":"brawler","sourceFile":"KurtAngle.gac","starterId":"Starter-KurtAngle","momentumMaximums":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":2,"Technical":-1},"headShotArt":"","playbookArt":"Sales-KurtAngle.gai","abilityImplemented":true,"passiveImplemented":true},"jericho":{"key":"jericho","name":"CHRIS JERICHO","ability":"Special: Jerichoholics","abilityText":"Special: Jerichoholics\r\nLose 1 Attitude and choose a Momentum from your playbook. That page is drawn. Use this ability three times per match and only if you have at least 1 Attitude.","entrance":"Original Entrance","hp":65,"style":"brawler","sourceFile":"ChrisJericho.gac","starterId":"Starter-ChrisJericho","momentumMaximums":{"Agility":-1,"Knowledge":-1,"Strength":2,"Strike":3,"Technical":-1},"headShotArt":"","playbookArt":"Sales-ChrisJericho.gai","abilityImplemented":true,"passiveImplemented":false},"benoit":{"key":"benoit","name":"CHRIS BENOIT","ability":"Each time an opponent's body part takes 5 damage, you draw a page. (This happens when that","abilityText":"Each time an opponent's body part takes 5 damage, you draw a page. (This happens when that body part takes 14 damage, 21 damage, and so on.)","entrance":"Original Entrance","hp":68,"style":"agile","sourceFile":"ChrisBenoit2E.gac","starterId":"Starter-TheCripplerChrisBenoit","momentumMaximums":{"Agility":5,"Knowledge":-1,"Strength":2,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"ChrisBenoit2EPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"bigshow":{"key":"bigshow","name":"BIG SHOW","ability":"The first 3 times you Autocounter without playing a Special that turn, you draw 3 pages.","abilityText":"The first 3 times you Autocounter without playing a Special that turn, you draw 3 pages.","entrance":"Original Entrance","hp":78,"style":"balanced","sourceFile":"TheBigShow.gac","starterId":"Starter-TheBigShow","momentumMaximums":{"Agility":0,"Knowledge":1,"Strength":-1,"Strike":-1,"Technical":0},"headShotArt":"","playbookArt":"TheBigShowPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"bookert":{"key":"bookert","name":"BOOKER T","ability":"Special: Can You Dig It?","abilityText":"Special: Can You Dig It?\r\n\r\nChoose a move page in hand. That page is ditched and you draw a page. This ability works nine times per match.","entrance":"Original Entrance","hp":70,"style":"balanced","sourceFile":"BookerT.gac","starterId":"Starter-BookerT","momentumMaximums":{"Agility":2,"Knowledge":5,"Strength":-1,"Strike":-1,"Technical":2},"headShotArt":"","playbookArt":"BookerTPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"edge":{"key":"edge","name":"EDGE","ability":"Whenever you attempt a pin after turn 10, you gain 1 Attitude (including pin attempts from","abilityText":"Whenever you attempt a pin after turn 10, you gain 1 Attitude (including pin attempts from moves or specials that pin).","entrance":"Original Entrance","hp":66,"style":"balanced","sourceFile":"Edge.gac","starterId":"Starter-Edge","momentumMaximums":{"Agility":2,"Knowledge":3,"Strength":3,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"EdgePlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"christian":{"key":"christian","name":"CHRISTIAN","ability":"\"Un-Americans\" Member","abilityText":"\"Un-Americans\" Member\r\nIf you don't have Warnings, your opponent can't play \"Plead to the Referee\" or \"Good Officiating!\"\r\nSpecial: On Your Own\r\nThe number of Warnings you have is reset to 0. Use twice per match.","entrance":"Original Entrance","hp":60,"style":"agile","sourceFile":"Christian.gac","starterId":"Starter-Christian","momentumMaximums":{"Agility":5,"Knowledge":2,"Strength":2,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"ChristianPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"eddie":{"key":"eddie","name":"EDDIE GUERRERO","ability":"When you end a turn without playing a move (or keeping a Hold applied), you lose up to 4 A","abilityText":"When you end a turn without playing a move (or keeping a Hold applied), you lose up to 4 Attitude Momentum.  When your opponent does this after turn 5, you draw a page.","entrance":"Original Entrance","hp":63,"style":"balanced","sourceFile":"EddieGuerrero.gac","starterId":"Starter-EddieGuerrero","momentumMaximums":{"Agility":1,"Knowledge":5,"Strength":2,"Strike":5,"Technical":1},"headShotArt":"","playbookArt":"EddieGuerreroPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"rvd":{"key":"rvd","name":"ROB VAN DAM","ability":"Special: R-V-D","abilityText":"Special: R-V-D\r\nUse once per match after turn 10, while in control, and before you play a move. Draw 1 page and gain 1 Attitude for each move in a row you've connected with. You can't play more pages this turn.","entrance":"Original Entrance","hp":64,"style":"power","sourceFile":"RobVanDam.gac","starterId":"Starter-RobVanDam","momentumMaximums":{"Agility":-1,"Knowledge":1,"Strength":2,"Strike":-1,"Technical":2},"headShotArt":"","playbookArt":"RobVanDamPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"flair":{"key":"flair","name":"RIC FLAIR","ability":"You can't play leg extended moves that cost 6 or more.","abilityText":"You can't play leg extended moves that cost 6 or more.\r\nSpecial: The Man\r\nIf not in control, choose a Special in your hand (except \"Once Too Often\" or \"Crowd Support\"). Your opponent buries one page with that name from hand.","entrance":"Original Entrance","hp":67,"style":"balanced","sourceFile":"RicFlairEX3LE.gac","starterId":"Starter-RicFlairLE","momentumMaximums":{"Agility":0,"Knowledge":-1,"Strength":1,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"","abilityImplemented":true,"passiveImplemented":true,"starterStatus":"recovered"},"hogan":{"key":"hogan","name":"HOLLYWOOD HULK HOGAN","ability":"nWo Superstar. You may play only one nWo page.","abilityText":"nWo Superstar. You may play only one nWo page.\r\nSpecial: \"The Icon\"\r\nUse only while in control when you have a Special in hand, up to five times per match. The least expensive Special in your hand is ditched and you gain 1 Knowledge.","entrance":"Original Entrance","hp":70,"style":"balanced","sourceFile":"HollywoodHogan.gac","starterId":"Starter-HulkHoganLE","momentumMaximums":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1},"headShotArt":"","playbookArt":"HollywoodHoganPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"nash":{"key":"nash","name":"KEVIN NASH","ability":"nWo Superstar","abilityText":"nWo Superstar\r\n\r\nKevin Nash starts the match with 6 leg damage.\r\n\r\nYour moves that cost 7 or more do +3 damage.","entrance":"Original Entrance","hp":73,"style":"balanced","sourceFile":"KevinNashEX3.gac","starterId":"Starter-KevinNash","momentumMaximums":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1},"headShotArt":"","playbookArt":"","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"recovered"},"jeffhardy":{"key":"jeffhardy","name":"JEFF HARDY","ability":"Member of Team Xtreme","abilityText":"Member of Team Xtreme\r\n\r\nJeff Hardy can Autocounter for -1 page.\r\n\r\nWhen Jeff Hardy plays a Drop move you draw a page.","entrance":"Original Entrance","hp":57,"style":"technical","sourceFile":"JeffHardy.gac","starterId":"Starter-JeffHardy","momentumMaximums":{"Agility":-1,"Knowledge":0,"Strength":1,"Strike":-1,"Technical":5},"headShotArt":"","playbookArt":"JeffHardyPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"matthardy":{"key":"matthardy","name":"MATT HARDY","ability":"Member of Team Xtreme","abilityText":"Member of Team Xtreme\r\n\r\nNot including the first two moves in each move string, Matt Hardy gets Crowd Support when your opponent hits you with a move.","entrance":"Original Entrance","hp":63,"style":"brawler","sourceFile":"MattHardy.gac","starterId":"Starter-MattHardy","momentumMaximums":{"Agility":-1,"Knowledge":2,"Strength":2,"Strike":5,"Technical":-1},"headShotArt":"","playbookArt":"MattHardyPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"lita":{"key":"lita","name":"LITA","ability":"Member of Team Xtreme, Diva Superstar","abilityText":"Member of Team Xtreme, Diva Superstar\r\n\r\nYou get \"Crowd Support\" when you play a Face page. When you play \"Crowd Support\" your opponent loses 1 Attitude.","entrance":"Original Entrance","hp":55,"style":"brawler","sourceFile":"Lita.gac","starterId":"Starter-Lita","momentumMaximums":{"Agility":-1,"Knowledge":2,"Strength":1,"Strike":3,"Technical":-1},"headShotArt":"","playbookArt":"LitaPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"trish":{"key":"trish","name":"TRISH STRATUS","ability":"Diva Superstar","abilityText":"Diva Superstar\r\nSpecial: 100%\r\nChoose a Method. When your opponent plays or connects with a move of that Method that costs 6 or more, you get \"Crowd Support\". Use this ability once.","entrance":"Original Entrance","hp":53,"style":"balanced","sourceFile":"TrishStratusEX3LE.gac","starterId":"Starter-TrishStratusLE","momentumMaximums":{"Agility":-1,"Knowledge":1,"Strength":1,"Strike":5,"Technical":-1},"headShotArt":"","playbookArt":"","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"recovered"},"bubba":{"key":"bubba","name":"BUBBA RAY DUDLEY","ability":"You do +1 damage with Takedown moves.","abilityText":"You do +1 damage with Takedown moves.\r\nSpecial: \"Those Damn Dudleyz!\"\r\nChoose an Event or Unique page from your playbook. You draw that page. Use this ability twice per match.","entrance":"Original Entrance","hp":72,"style":"power","sourceFile":"BubbaRayDudley.gac","starterId":"Starter-BubbaRayDudley","momentumMaximums":{"Agility":1,"Knowledge":-1,"Strength":5,"Strike":-1,"Technical":2},"headShotArt":"","playbookArt":"BubbaRayDudleyPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"dvon":{"key":"dvon","name":"D-VON DUDLEY","ability":"Special: \"D-Von! Get the...\"","abilityText":"Special: \"D-Von! Get the...\"\r\nChoose a Weapon, Ringside Special, \"Set Up A Table\" or \"Set Up A Ladder\" from your playbook. You draw that page. Use this ability twice per match.","entrance":"Original Entrance","hp":68,"style":"power","sourceFile":"DVonDudley.gac","starterId":"Starter-DVon","momentumMaximums":{"Agility":2,"Knowledge":2,"Strength":5,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"DVonDudleyPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"spike":{"key":"spike","name":"SPIKE DUDLEY","ability":"Spike Dudley can't play Strength moves offensively against non-Cruiserweights.","abilityText":"Spike Dudley can't play Strength moves offensively against non-Cruiserweights.\r\n\r\nWhenever you are hit with a move that does 4 or more damage, you draw a page.","entrance":"Original Entrance","hp":51,"style":"balanced","sourceFile":"SpikeDudley.gac","starterId":"Starter-SpikeDudley","momentumMaximums":{"Agility":-1,"Knowledge":2,"Strength":1,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"SpikeDudleyPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"bradshaw":{"key":"bradshaw","name":"BRADSHAW","ability":"Hardcore Superstar","abilityText":"Hardcore Superstar\r\n\r\nWhen you connect with an Impact move that costs 5 or more, your opponent ditches a random special from hand (except Crowd Support) or Gameplan from play.","entrance":"Original Entrance","hp":71,"style":"balanced","sourceFile":"Bradshaw.gac","starterId":"Starter-Bradshaw","momentumMaximums":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1},"headShotArt":"","playbookArt":"BradshawPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"goldust":{"key":"goldust","name":"GOLDUST","ability":"Special: \"The Bizarre One\"","abilityText":"Special: \"The Bizarre One\"\r\n\r\nDitch your entire hand. You draw ten pages. Use this ability only once, and only after turn 20.","entrance":"Original Entrance","hp":69,"style":"power","sourceFile":"Goldust.gac","starterId":"Starter-Goldust","momentumMaximums":{"Agility":1,"Knowledge":-1,"Strength":5,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"GoldustPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"lancestorm":{"key":"lancestorm","name":"LANCE STORM","ability":"Member of The Un-Americans","abilityText":"Member of The Un-Americans\r\n\r\nSpecial: \"Serious\"\r\nIf your next move this turn is countered, draw a page. Use this ability 9 times per match and only when in control.","entrance":"Original Entrance","hp":65,"style":"agile","sourceFile":"LanceStorm.gac","starterId":"Starter-LanceStorm","momentumMaximums":{"Agility":5,"Knowledge":5,"Strength":2,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"LanceStormPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"rikishi":{"key":"rikishi","name":"RIKISHI","ability":"Special: \"Sultan of Squat\"","abilityText":"Special: \"Sultan of Squat\"\r\nYour opponent loses 1 Momentum and a Strength or Strike Momentum page is placed in your hand. This ability works twice a match.","entrance":"Original Entrance","hp":76,"style":"balanced","sourceFile":"RikishiPhatu.gac","starterId":"RikishiPhatuStarter","momentumMaximums":{"Agility":0,"Knowledge":2,"Strength":-1,"Strike":-1,"Technical":1},"headShotArt":"","playbookArt":"Sales-RikishiPhatu.gai","abilityImplemented":true,"passiveImplemented":false},"scotty":{"key":"scotty","name":"SCOTTY 2 HOTTY","ability":"Special: Turn it up!","abilityText":"Special: Turn it up!\r\nChoose a Gameplan Special from your playbook; you draw it. Use only if you have connected with 2 moves in a row, once per move string and four times per match.","entrance":"Original Entrance","hp":61,"style":"agile","sourceFile":"ScottyTooHottie.gac","starterId":"Starter-Scotty2Hotty","momentumMaximums":{"Agility":-1,"Knowledge":1,"Strength":1,"Strike":-1,"Technical":-1},"headShotArt":"Scotty2HottyHeadShot.gai","playbookArt":"Scotty2HottyPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"tajiri":{"key":"tajiri","name":"TAJIRI","ability":"Tajiri's Strike moves do +4 damage if you connected with a non-Strike move last turn.","abilityText":"Tajiri's Strike moves do +4 damage if you connected with a non-Strike move last turn.","entrance":"Original Entrance","hp":61,"style":"balanced","sourceFile":"TajiriLE.gac","starterId":"Starter-Tajiri","momentumMaximums":{"Agility":-1,"Knowledge":2,"Strength":1,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"TajiriPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"tazz":{"key":"tazz","name":"TAZZ","ability":"Special: Change The Mood","abilityText":"Special: Change The Mood\r\n\r\nDitch a random page and name an In Close move in your Playbook. That move is drawn to your hand. This works 2 times per match.","entrance":"Original Entrance","hp":70,"style":"agile","sourceFile":"Tazz.gac","starterId":"Starter-Tazz","momentumMaximums":{"Agility":1,"Knowledge":1,"Strength":-1,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"Sales-Tazz.gai","abilityImplemented":true,"passiveImplemented":false},"test":{"key":"test","name":"TEST","ability":"\"Un-Americans\" Member","abilityText":"\"Un-Americans\" Member\r\n\r\nYour Impact moves do +1 damage for each other Impact move you have connected with. This count resets when you lose control.","entrance":"Original Entrance","hp":71,"style":"agile","sourceFile":"AnotherAttitudeStar.gac","starterId":"Starter-Test","momentumMaximums":{"Agility":2,"Knowledge":2,"Strength":-1,"Strike":-1,"Technical":1},"headShotArt":"","playbookArt":"AnotherAttitudeStarPlaybook.gai","abilityImplemented":true,"passiveImplemented":true},"hurricane":{"key":"hurricane","name":"THE HURRICANE","ability":"Special: Super Powers","abilityText":"Special: Super Powers\r\n\r\nChoose a Move in your opponent's hand. You steal it and gain enough momentum to play it until end of turn (even breaking your limits). Use once per match, after turn 5.","entrance":"Original Entrance","hp":63,"style":"brawler","sourceFile":"TheHurricane.gac","starterId":"Starter-TheHurricaneLE","momentumMaximums":{"Agility":-1,"Knowledge":2,"Strength":1,"Strike":5,"Technical":-1},"headShotArt":"","playbookArt":"TheHurricanePlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"regal":{"key":"regal","name":"WILLIAM REGAL","ability":"Special: \"Besmirched\"","abilityText":"Special: \"Besmirched\"\r\n\r\nOnce per game, choose \"Distract the Referee\" or \"Plead to the Ref\" and that page is played.\r\n(The play restrictions of those pages are ignored.)","entrance":"Original Entrance","hp":68,"style":"power","sourceFile":"WilliamRegal.gac","starterId":"Starter-WilliamRegal3","momentumMaximums":{"Agility":1,"Knowledge":-1,"Strength":2,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"WilliamRegalPlaybook.gai","abilityImplemented":true,"passiveImplemented":false},"xpac":{"key":"xpac","name":"X-PAC","ability":"When in control, your Impact moves do up to +3 damage.","abilityText":"When in control, your Impact moves do up to +3 damage.\r\nSpecial: Martial Arts Pro\r\nChoose a Leg Extended move in your Playbook. That move is drawn to your hand. Use once per match.","entrance":"Original Entrance","hp":58,"style":"agile","sourceFile":"XPac.gac","starterId":"Starter-XPac","momentumMaximums":{"Agility":-1,"Knowledge":1,"Strength":1,"Strike":-1,"Technical":-1},"headShotArt":"","playbookArt":"Sales-XPac.gai","abilityImplemented":true,"passiveImplemented":false},"alsnow":{"key":"alsnow","name":"AL SNOW","ability":"Hardcore Superstar","abilityText":"Hardcore Superstar\r\n\r\nSpecial: \"What Does Everybody Want?\"\r\n\r\nDraw a page for each Momentum type you have. Use this ability once per game.","entrance":"Original Entrance","hp":62,"style":"balanced","sourceFile":"AlSnow.gac","starterId":"BonusSnow","momentumMaximums":{"Agility":-1,"Knowledge":2,"Strength":2,"Strike":5,"Technical":-1},"headShotArt":"AlSnowHeadShot.gai","playbookArt":"Sales-AlSnow.gai","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"recovered"},"blackman":{"key":"blackman","name":"STEVE BLACKMAN","ability":"Hardcore Superstar","abilityText":"Hardcore Superstar\r\n\r\nThe first six times Steve Blackman counters with a non-Defensive move, he draws a page. (This page is drawn when the page is played, not when the counter move connects.)","entrance":"Original Entrance","hp":62,"style":"balanced","sourceFile":"SteveBlackman.gac","starterId":"BonusBlackman","momentumMaximums":{"Agility":1,"Knowledge":2,"Strength":-1,"Strike":-1,"Technical":-1},"headShotArt":"SteveBlackmanHeadShot.gai","playbookArt":"Sales-SteveBlackman.gai","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"recovered"},"brock":{"key":"brock","name":"BROCK LESNAR","ability":"You may only play 3 Momentum pages. You may not play Amazing Entrance.","abilityText":"You may only play 3 Momentum pages. You may not play Amazing Entrance.\r\n\r\nEvery six turns you get +1 Strength. (At the start of turn six, twelve, and so on.)","entrance":"Original Entrance","hp":75,"style":"balanced","sourceFile":"BrockLesnar.gac","starterId":"OfficialProduct-Brock-SummerSlam2002","momentumMaximums":{"Agility":0,"Knowledge":1,"Strength":-1,"Strike":2,"Technical":1},"headShotArt":"BrockLesnarHeadShot.gai","playbookArt":"BrockLesnarPlaybook.gai","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"official-product-build"},"shane":{"key":"shane","name":"SHANE MCMAHON","ability":"Hardcore Superstar","abilityText":"Hardcore Superstar\r\n\r\nWhenever you play a Special or receive a Warning, Shane McMahon heals 2 Hit Points and his opponent gets a -2% pin chance penalty.","entrance":"Original Entrance","hp":50,"style":"balanced","sourceFile":"ShaneMcMahon.gac","starterId":null,"momentumMaximums":{"Agility":-1,"Knowledge":-1,"Strength":1,"Strike":2,"Technical":-1},"headShotArt":"ShaneMcMahonHeadShot.gai","playbookArt":"Sales-ShaneMcMahon.gai","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"source-package-unresolved"},"hbk":{"key":"hbk","name":"SHAWN MICHAELS","ability":"Shawn Michaels can Autocounter for 3 less pages and starts the match with 6 back damage.","abilityText":"Shawn Michaels can Autocounter for 3 less pages and starts the match with 6 back damage.\r\nAt the start of each turn, all pages in your hand with Willpower 2 or more (counts as two or more pages for Autocountering) are ditched.","entrance":"Original Entrance","hp":68,"style":"balanced","sourceFile":"ShawnMichaels.gac","starterId":"OfficialProduct-ShawnMichaels-SummerSlam2002","momentumMaximums":{"Agility":-1,"Knowledge":-1,"Strength":1,"Strike":-1,"Technical":-1},"headShotArt":"ShawnMichaelsHeadShot.gai","playbookArt":"ShawnMichaelsPlaybook.gai","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"official-product-build"},"scotthall":{"key":"scotthall","name":"SCOTT HALL","ability":"nWo Superstar","abilityText":"nWo Superstar\r\nWhen Scott Hall plays a Strike Momentum, you draw a random Heel page. When he plays a Strength Momentum, you draw a random Damage Special. Each ability works twice per match.","entrance":"Original Entrance","hp":71,"style":"balanced","sourceFile":"ScottHall.gac","starterId":"OfficialProduct-ScottHall-WMX8","momentumMaximums":{"Agility":0,"Knowledge":3,"Strength":-1,"Strike":-1,"Technical":2},"headShotArt":"ScottHallHeadShot.gai","playbookArt":"ScottHallPlaybook.gai","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"official-product-build"},"rey":{"key":"rey","name":"REY MYSTERIO","ability":"Special: Cruiserweight Legend","abilityText":"Special: Cruiserweight Legend\r\n\r\nDraw a page. Use this ability only if you have less than 6 pages in hand, and only if your opponent has at least 3 momentum.","entrance":"Original Entrance","hp":59,"style":"balanced","sourceFile":"ReyMysterioLE.gac","starterId":null,"momentumMaximums":{"Agility":-1,"Knowledge":5,"Strength":1,"Strike":2,"Technical":-1},"headShotArt":"ReyMysterioHeadShot.gai","playbookArt":"ReyMysterioPlaybook.gai","abilityImplemented":true,"passiveImplemented":false,"starterStatus":"source-package-unresolved"}};
let profile=loadProfile(),selectedSuperstar='austin',selectedOpponent='rock',opening=[],matchPlayer='austin',selectedDeckMode='starter',selectedRecommendedDeck=null;
function blankProfile(){return{decks:{},wins:0,losses:0,stats:{},credits:0,xp:0,matchHistory:[],missions:{},firstLaunch:true,settings:{sound:true,music:true,musicVolume:1,sfxVolume:1,animations:true,confirmReset:true},collection:{},unopenedPacks:[],openedPacks:0,saveVersion:VERSION}}
function parseStoredProfile(key){const raw=localStorage.getItem(key);if(!raw)return null;const p=JSON.parse(raw);if(!p||typeof p!=='object'||Array.isArray(p))throw new Error('Invalid save object');return p}
function loadProfile(){let recovered=false;try{const current=parseStoredProfile(STORE);const prior=parseStoredProfile('wa-mobile-v080');const p=current||prior||blankProfile();return Object.assign(blankProfile(),p,{saveRecovered:false})}catch(err){try{const backup=parseStoredProfile(BACKUP_STORE);if(backup){recovered=true;return Object.assign(blankProfile(),backup,{saveRecovered:true})}}catch{}const fresh=blankProfile();fresh.saveRecovered=recovered;return fresh}}
function saveProfile(){try{const existing=localStorage.getItem(STORE);if(existing) localStorage.setItem(BACKUP_STORE,existing);profile.saveVersion=VERSION;profile.lastSavedAt=new Date().toISOString();localStorage.setItem(STORE,JSON.stringify(profile));return true}catch(err){console.error('Save failed',err);return false}}
const BOOSTER_CONFIG={"cardsPerPack":5,"odds":{"Common":0.5,"Uncommon":0.3,"Rare":0.15,"Very Rare":0.05},"copyCaps":{"default":5,"Momentum":20},"sets":{"CORE":{"name":"1st Edition","packImage":"./assets/gai/Sales-BoosterPack2E.webp"},"EX1":{"name":"No Way Out","packImage":"./assets/gai/Sales-BoosterPackEX1.webp"},"EX2":{"name":"TLC","packImage":"./assets/gai/Sales-BoosterPackEX2.webp"},"EX3":{"name":"Unforgiven","packImage":"./assets/gai/Sales-BoosterPackEX3.webp"}}};
const STARTER_UNLOCK_IDS=new Set(["2ndRopeLegDropEX2", "AbdominalStretch", "AchillesHeel2EV095", "AdvantageTechnicalV095", "AggressiveStrength", "AgilityTourn", "AgilityTourn", "AgilityTourn", "AheadOfTheGameV095", "AlwaysThinking2EV095", "AlwaysThinkingV095", "AngleSlam2E", "AnkleKeyLock", "Original_ArmDragTakedown2E", "ArmStretch", "Armbar", "ArmbarEX3", "ArmbarTakedown", "AsaiMoonsault2E", "AtomicDrop", "BackBodyDrop", "BackBodyDropOverTheRopes", "BackElbow", "BackHeelTrip", "BackHeelTripEX3", "BackSuplex", "BackflipSplash", "BaseballSlideEX2", "BearHug", "BellyToBellySuplex2E", "BellyToBellyToRingside", "BigAndNasty2EV095", "BigBackBodyDrop", "BigandNastyEX1V095", "BodySlam", "BoringV095", "BounceOffTheRopes2EV095", "BounceOffTheRopes2EV095", "Break2EV095", "BreakEX2V095", "BubbaBomb", "BubbaRayV095", "BuildingMomentumV095", "Bulldog", "Bulldog2E", "ButtShot", "CamelClutchEX2", "CaptureSuplex", "CatchHimStunnedV095", "ChairShotEX2", "OriginalVariant_ChopPromo", "Clip2E", "ClipEX2", "ClotheslineFromHell", "ClotheslineInTheCorner", "ClotheslineOverTheRopes", "ClotheslineOverTheRopesEX2", "Compactor", "CompactorEX2", "CornerBarage", "CornerBarrage2E", "CowBellShot", "DDT", "DDT2E", "DDT2E", "DVonEX2V095", "DVonEX2V095", "DeathblowLE", "Disadvantage2EV095", "DistractTheReferee", "DistractTheRefereeTournV095", "DoubleBackBreaker", "DoubleLegTakedown2E", "DoublePowerbomb", "DoubleUnderhookSuplex", "DoubleUnderhookSuplex2E", "DragonSleeper2E", "DragonSuplex", "DropKickOverTheRopes", "DropKickToTheFloor2E", "DropKickToTheKnee", "DudleyDog", "EarClap", "Elbow", "ElbowToBackOfTheHead2E", "Enzugiri", "EuropeanUppercut", "EuropeanUppercutEX3", "EverythingHurts2EV095", "EyeOfTheHurricane", "EyeOfTheHurricaneLE", "EyeRake2E", "F5", "Facebuster", "Facebuster2E", "FallawaySlam", "FigureFour2E", "FiremansCarry", "FishermansSuplex", "FiveStarFrogSplash", "FiveStarFrogSplashEX2", "FloatoverDDT", "Original_FlyingWheelKick2E", "ForearmSmash", "ForearmSmash2E", "FrogSplash2E", "FrogSplashEX1", "FrontHeelTrip", "FujiwaraArmbar", "FullNelsonSlam", "GermanSuplex", "GetAShoulderUpV095", "GoingUpTopV095", "GoldenGlobes", "GreatImpact", "GuitarShot", "GutBuster", "GutWrenchSuplex", "GutWrenchSuplex2E", "Hammerlock", "HardcoreEX3V095", "Headlock", "HelloNWOV095", "HesCallingForIt", "HeyRefThatWasThreeV095", "HighCrossBodyEX3", "HighKnee2E", "HighSpotV095", "HipToss", "HookTheLeg2EV095", "HookTheLegEX2V095", "HookTheLegX8V095", "IGotYourBack2EV095", "InsideCradle", "InsideCrescentKick", "InvertedAtomicDrop", "InvertedAtomicDropEX3", "JackknifePowerbomb", "KickToTheKnee", "KneeBreaker", "KneeDropEX2", "KneeLift", "KnowledgeTourn", "KnowledgeTourn", "KnowledgeTourn", "LadderShot", "Lariat2E", "LariatEX2", "LeapingAxeKick", "LeapingSideKickEX2", "LegGrapevine2E", "LiftIntoPost", "LitasMoonsault", "LitasMoonsault2E", "LitasTwistOfFate2E", "LowBlow", "LowBlowKick2E", "LowBlowLegDrop", "LowBlowLegDropEX2", "LowBlowUppercut", "NeckVice2E", "NeckbreakerEX1", "NeckbreakerEX2", "NorthernLightsSuplexEX2", "OneArmBulldog", "OriginalExact_3D", "OriginalExact_3DEX2", "OriginalExact_AggressiveAgility", "OriginalExact_ArmDragTakedownEX3", "OriginalExact_ArmbarTakedownEX3", "OriginalExact_AsaiMoonsault", "OriginalExact_BackBodyDropEX1", "OriginalExact_BackSuplex2E", "OriginalExact_BackSuplex2E", "OriginalExact_BackSuplexEX2", "OriginalExact_BackToTheWellOnceToOften", "OriginalExact_Backslide", "OriginalExact_BeautifulChainWrestling", "OriginalExact_BodySlamEX1", "OriginalExact_CatchTheFoot", "OriginalExact_ChokeOnTheRopes", "OriginalExact_ChopEX2", "OriginalExact_ClotheslineEX1", "OriginalExact_CollarAndElbowTieup", "OriginalExact_CollarAndElbowTieup2E", "OriginalExact_ControlThePace", "OriginalExact_DDTEX3", "OriginalExact_DirtiestPlayerInTheGame", "OriginalExact_DropKickEX1", "OriginalExact_DropKickEX3", "OriginalExact_DropToeHold", "OriginalExact_ElbowDrop", "OriginalExact_FlyingHeadScissors", "OriginalExact_FrontFacelock2E", "OriginalExact_GotAllOfIt2E", "OriginalExact_GrabTheRope", "OriginalExact_GrabTheRopes2E", "OriginalExact_HalfBostonCrab2E", "OriginalExact_HandspringBackElbowLE", "OriginalExact_HeadlockEX1", "OriginalExact_HesCallingForIt2E", "OriginalExact_HipToss2E", "OriginalExact_HipTossEX3", "OriginalExact_Hurricanrana", "OriginalExact_Intelligence", "OriginalExact_Intensity", "OriginalExact_Intensity2E", "OriginalExact_InterviewWithMichaelCole", "OriginalExact_InvertedAtomicDropEX2", "OriginalExact_IrishWhip", "OriginalExact_IrishWhip2E", "OriginalExact_Jawbreaker", "OriginalExact_KickToGut", "OriginalExact_KneeDrop", "OriginalExact_LandOnYourFeet", "OriginalExact_Litacanrana", "OriginalExact_Litacanrana2E", "OriginalExact_LookingForWeaknesses", "OriginalExact_LouTheszPressEX1", "OriginalExact_MissileDropkick", "OriginalExact_MissileDropkickEX2", "OriginalExact_Misunderstanding", "OriginalExact_Neckbreaker", "OriginalExact_NewWorldOrderEX3", "OriginalExact_O", "OriginalExact_OffTheBarricade", "OriginalExact_OldSchool2E", "OriginalExact_OldSchoolEX1", "OriginalExact_OnceTooOften2E", "OriginalExact_OneStepAhead", "OriginalExact_OneStepAhead2E", "OriginalExact_PleadToTheReferee", "OriginalExact_PleadToTheReferee2E", "OriginalExact_Pose", "OriginalExact_PowerSlamEX2", "OriginalExact_PunchEX1", "OriginalExact_PushThePace", "OriginalExact_RefBump2E", "OriginalExact_RefBump2E", "OriginalExact_RingVeteran", "OriginalExact_RollUp2E", "OriginalExact_RollingGermanSuplex", "OriginalExact_RussianLegSweepEX2", "OriginalExact_ScissorsKickEX2", "OriginalExact_ScissorsKickEX2", "OriginalExact_SensingVictory", "OriginalExact_SentonBackSplash", "OriginalExact_ShaneMcMahonEX1", "OriginalExact_ShoveWithLegs", "OriginalExact_SlowAndMethodical", "OriginalExact_SpineroonieEX2", "OriginalExact_SpineroonieEX2", "OriginalExact_StepOverHeelKickEX2", "OriginalExact_Splash2E", "OriginalExact_StacyKiebler", "OriginalExact_SteelFoldingChair2E", "OriginalExact_SteelFoldingChairEX2", "OriginalExact_StepOverHeelKickEX2", "OriginalExact_StoneColdStunnerEX1", "OriginalExact_StunningBlow", "OriginalExact_StunningBlow2E", "OriginalExact_Superplex", "OriginalExact_SupportFromLita", "OriginalExact_TakeABreather", "OriginalExact_TakingAHugeChance", "OriginalExact_TarantulaLE", "OriginalExact_TemperTantrum", "OriginalExact_TestOfStrength", "OriginalExact_ThatWasThree2E", "OriginalExact_TheFansComeAlive", "OriginalExact_TheUnamericans", "OriginalExact_TheWorm", "OriginalExact_TiltaWhirlBackbreaker", "OriginalExact_ToTheFloor", "OriginalExact_TombstonePiledriver", "OriginalExact_TopRopeClothesline", "OriginalExact_TopeSuicida", "OriginalExact_ToughGuy", "OriginalExact_ToughGuy2E", "OriginalExact_TreeOfWoe", "OriginalExact_VanDaminatorEX2", "OriginalExact_VanDaminatorEX2", "OriginalExact_VerticalSuplexEX1", "OriginalExact_W", "OriginalExact_WhatImpact2E", "OriginalExact_Whooooooooooo", "OriginalExact_WillToWin2E", "OriginalExact_WithAuthority2E", "OriginalExact_WithAuthority2E", "OriginalExact_WithAuthorityEX1", "OriginalExact_WithAuthorityEX2", "OriginalExact_WorkingStiff2E", "AgilityTourn", "OriginalMomentumHeat", "KnowledgeTourn", "StrengthTourn", "StrikeTourn", "TechnicalTourn", "AgilityTourn", "BellyToBellySuplex2E", "DoubleLegTakedown2E", "DragonSleeper2E", "KnowledgeTourn", "StrengthTourn", "StrikeTourn", "TechnicalTourn", "ThrowOverTheRopes2E", "WhipIntoSteelSteps2E", "Original_2ndRopeLegDrop2E", "Original_2ndRopeSplash", "Original_AbdominalStretch2E", "Original_AheadOfTheGame2E", "Original_ArmDragCounterTourn", "Original_ArmDragTakedown2E", "Original_ArmDragTakedownEX2", "Original_ArmbarTakedown2E", "Original_AtomicDrop2E", "Original_TheBigBootEX2", "Original_BackBodyDrop2E", "Original_BackBodyDropToRingside2E", "Original_BackElbow2E", "Original_BackElbowEX1", "Original_BackHeelTrip2E", "Original_BackflipCounter", "Original_BellyToBellySuplexEX2", "Original_BlockTourn", "Original_BodySlam2E", "Original_BodySlamEX2", "Original_Boring2E", "Original_BroncoBuster", "Original_BubbaBombEX2", "Original_Buzzkiller", "Original_ChairShot2E", "Original_ChokeSlam", "Original_Clothesline", "Original_Clothesline2E", "Original_ClotheslineEX3", "Original_ClotheslineOverTheRopes2E", "Original_CornerCharge", "Original_CripplerCrossFaceTourn", "Original_CripplerCrossFaceTourn", "Original_CrossArmBreaker2E", "Original_CurtainCall", "Original_DiveToTheFloor", "Original_Dodge", "Original_DodgeTourn", "Original_DoubleLegTakedownEX2", "Original_DropKick", "Original_DropKick2E", "Original_DuckTourn", "Original_EdgecutionTourn", "Original_Edgeomatic2E", "Original_Elbow2E", "Original_ElbowDropEX3", "Original_ElbowToTheBackOfTheHead", "Original_ElbowToTheBackOfTheHeadEX2", "Original_EnzugiriEX2", "Original_FiremansCarryEX2", "Original_FistDrop", "Original_FistDrop2E", "Original_FlatOfTheFoot2E", "Original_FlatOfTheFoot2E", "Original_FlatOfTheFootEX2", "Original_FlippingFaceSlam", "Original_FloatoverDDT2E", "Original_FlyingArmbarTakedown", "Original_GermanSuplex2E", "Original_Hammerlock2E", "Original_HighCrossBody", "Original_HipTossEX2", "Original_HogansBigBoot2E", "Original_HogansBigBoot2E", "Original_HogansLegDropTourn", "Original_HogansLegDropTourn", "Original_InsideCradle2E", "Original_JawbreakerEX2", "Original_KneeLift2E", "Original_KneeLiftEX3", "Original_LegDrop", "Original_LegDrop2E", "Original_LegSweep", "Original_LowBlowChairShot", "Original_LowBlowUppercut2E", "Original_MafiaKick2E", "Original_MafiaKick2E", "Original_Moonsault", "Original_Moonsault2E", "Original_Neckbreaker2E", "Original_NoHandsPlancha", "Original_OlympicSlam", "Original_PedigreeTourn", "Original_PedigreeTourn", "Original_PokeInTheEye", "Original_PowerBomb2E", "Original_PowerBomb2E", "Original_PowerSlam2E", "Lariat2E", "Original_PumpHandleSlamEX2", "Original_Punch2E", "Original_RegalStretchEX1", "Original_ReverseDDT2E", "Original_RicFlairsFigureFour", "Original_RicFlairsFigureFour", "Original_SamoanDrop2E", "Original_SamoanDropEX2", "Original_ShoveTourn", "Original_ShoveTourn", "Original_SideKick", "Original_SidewalkSlamEX2", "Original_SnapMare2E", "Original_SnapSuplex2E", "Original_SplashEX2", "Original_Splash_Core", "Original_SpringboardDropKick", "Original_StandingSwitch", "Original_StandingSwitchTourn", "Original_StephanieMcMahonHelmsley_Core", "Stratusfaction", "Original_Stratusphere", "Original_SuperplexEX3", "Original_Tazzmission", "Original_TheBigBootEX2", "Original_TheRocksDDT2E", "Original_TrishsChop", "Original_TrishsChop", "Original_UpAndOver", "Original_UpAndOverTourn", "Original_UseTheRopesForLeverage", "Original_VerticalSuplex2E", "AchillesHeel2EV095", "Overcast", "OvercastLE", "Piledriver", "PlanchaEX2", "PowerBombEX2", "PowerBombFromTheLadder", "PowerSlam", "PressSlam", "PressSlamEX2", "PumpHandle", "Original_PumpHandleSlamEX2", "Punch", "PunchesInTheCorner", "RazorsEdge", "ReverseChinlock", "ReverseDDT", "RicFlairsChopLE", "RikishiDriver", "RollingGermanSuplex2E", "RoundKick", "RoundKick2E", "RoundKickEX2", "RunningClotheslineEX2", "RunningElbow", "RunningNeckbreaker", "RussianLegSweep2E", "RussianLegSweep2E", "RussianLegSweepEX1", "SamoanDrop", "SavageElbow", "SentonSplash2E", "SentonSplashEX1", "ShiningWizardKick", "ShortArmClothesline", "ShoulderBlock", "ShoulderBlockEX3", "ShoulderToMidsection", "SidewalkSlam", "Slap", "Slap2E", "Sleeper2E", "SnakeEyes", "SnakeEyes2E", "SnapMare", "SnapSuplex", "SoloConchairto", "Spear", "SpineBuster", "SpineKick", "SpinningHeelKick2E", "SpinningHeelKick2E", "SpinningHeelKickEX1", "SpinningPowerbomb", "SpinningPowerslam", "StraightJacketTakedown", "StraightRightHand", "StraightShooter", "Stratusfaction", "StrengthTourn", "StrengthTourn", "StrengthTourn", "StrengthTourn", "StrikeTourn", "StrikeTourn", "StrikeTourn", "StrikeTourn", "StrongClothesline", "SunsetFlip", "OriginalVariant_SuperMomentum", "Superkick", "SuplexOntoTheRopes", "SuplexToTheFloor", "Surfboard", "SwantonBomb", "SwantonBombEX2", "SweetChinMusic", "Taunt", "Taunt2E", "TechnicalTourn", "TechnicalTourn", "TechnicalTourn", "TechnicalTourn", "TheBigElbowEX2", "TheFinalCut2E", "TheFinalCutEX1", "TheGuillotine", "TheLastRide2E", "TheLastRideEX1", "ThePeoplesElbow", "ThePeoplesElbow2E", "ThePeoplesElbow2ELE", "ThrowOffTheStage", "ThrowOverTheRopes2E", "ThrustKick", "ThrustKick2E", "ThrustUppercut", "TombstonePiledriver2E", "TopRopeClothesline2E", "TornadoDDT", "TreeOfWoe2E", "TurnbuckleSmash", "TwistOfFate", "Unprettier", "VerticalSuplex", "WallsOfJericho", "WallsOfJericho2E", "Wazzzzzaaaappp", "WillToWin", "Original_WraparoundNeckbreakerEX1", "XFactor", "original-duck", "original-headlock2e"]);
const AUSTIN_BOOSTER_ONLY_IDS=['OriginalExact_LouTheszPressEX1','Original_DropTheHammerEX1','OriginalExact_TwoFingerSaluteEX1','OriginalExact_StompAMudholeEX2','OriginalExact_WhatEX2','OriginalExact_TheRattlesnakeEX2'];
const AUSTIN_BOOSTER_ONLY_ALIASES=['LouThesz','Original_DropTheHammer','Mudhole','StompAMudhole.gac','TwoFingerSalute.gac','What.gac','TheRattlesnake.gac'];
for(const id of [...AUSTIN_BOOSTER_ONLY_IDS,...AUSTIN_BOOSTER_ONLY_ALIASES])STARTER_UNLOCK_IDS.delete(id);
function cardCopyCap(c){return c?.cardClass==='Momentum'?20:5}
function boosterSetKeyForCard(c){const raw=`${c?.setKey||''} ${c?.set||''} ${c?.variantEdition||''} ${c?.sourceFile||''}`.toUpperCase();for(const k of Object.keys(BOOSTER_CONFIG.sets))if(raw.includes(k))return k;return'CORE'}
function boosterRarityForCard(c){const r=String(c?.originalRarity||c?.rarity||'').toLowerCase(),n=Number(c?.originalRarityId||c?.rarityStars||0);if(r.includes('very')||n===4)return'Very Rare';if(r.includes('rare')||n===3)return'Rare';if(r.includes('uncommon')||n===2)return'Uncommon';return'Common'}
function ownedCount(c){return Math.max(0,Number(profile.collection?.[String(c.id)])||0)}
function grantStarterCollection(){profile.collection=profile.collection||{};let changed=false;for(const id of STARTER_UNLOCK_IDS){const c=cards.find(x=>String(x.id)===String(id));if(!c)continue;const cap=cardCopyCap(c),cur=ownedCount(c);if(cur<cap){profile.collection[id]=cap;changed=true}}if(changed)saveProfile()}
function eligibleBoosterCards(setKey,rarity=null){return cards.filter(c=>c.cardClass!=='Superstar'&&boosterSetKeyForCard(c)===setKey&&(!rarity||boosterRarityForCard(c)===rarity)&&ownedCount(c)<cardCopyCap(c))}
function weightedRarityRoll(av){const p=Object.entries(BOOSTER_CONFIG.odds).filter(([r])=>av.includes(r)),t=p.reduce((n,[,w])=>n+w,0);let x=Math.random()*t;for(const[r,w]of p){x-=w;if(x<=0)return r}return p.at(-1)?.[0]}
function generateFiveCardPack(setKey){const pulls=[];for(let i=0;i<5;i++){const av=Object.keys(BOOSTER_CONFIG.odds).filter(r=>eligibleBoosterCards(setKey,r).length);if(!av.length)break;const r=weightedRarityRoll(av),pool=eligibleBoosterCards(setKey,r),c=pool[Math.floor(Math.random()*pool.length)];pulls.push(c);profile.collection[String(c.id)]=(profile.collection[String(c.id)]||0)+1}if(pulls.length&&!pulls.some(c=>['Uncommon','Rare','Very Rare'].includes(boosterRarityForCard(c)))){const better=['Very Rare','Rare','Uncommon'].flatMap(r=>eligibleBoosterCards(setKey,r));if(better.length){const old=pulls.at(-1),rep=better[Math.floor(Math.random()*better.length)];profile.collection[String(old.id)]--;pulls[pulls.length-1]=rep;profile.collection[String(rep.id)]=(profile.collection[String(rep.id)]||0)+1}}saveProfile();return pulls}
function setCompletionStats(k){const list=cards.filter(c=>c.cardClass!=='Superstar'&&boosterSetKeyForCard(c)===k);return{list,ownedUnique:list.filter(c=>ownedCount(c)>0).length,completed:list.filter(c=>ownedCount(c)>=cardCopyCap(c)).length,totalCopies:list.reduce((n,c)=>n+cardCopyCap(c),0),ownedCopies:list.reduce((n,c)=>n+Math.min(cardCopyCap(c),ownedCount(c)),0)}}
function ensureRewardProfile(){profile.collection=profile.collection||{};profile.unopenedPacks=profile.unopenedPacks||[];profile.openedPacks=profile.openedPacks||0;if(profile.austinBoosterResetVersion!=='0.9.170'){for(const id of [...AUSTIN_BOOSTER_ONLY_IDS,...AUSTIN_BOOSTER_ONLY_ALIASES])delete profile.collection[id];profile.austinBoosterResetVersion='0.9.170';try{saveProfile()}catch{}}}
function cardSetKey(c){if(c.originalSetKey)return c.originalSetKey;const e=(c.variantEdition||'Core').toUpperCase();if(e.includes('EX1'))return'EX1';if(e.includes('EX2'))return'EX2';if(e.includes('EX3'))return'EX3';if(e.includes('2E'))return'2E';return'CORE'}
function boosterArt(p){return ART.assets?.[p.artSource]?.file||ART.assets?.[p.artSource?.replace('.gai','')]?.file||''}
function awardVictoryBooster(){ensureRewardProfile();const eligible=(BOOSTERS.products||[]).filter(p=>p.rewardEligible);if(!eligible.length)return null;const p=eligible[Math.floor(Math.random()*eligible.length)];profile.unopenedPacks.push({id:p.id,earned:new Date().toISOString()});return p}
function boosterPool(p){return cards.filter(c=>c.verifiedOriginal!==false&&cardSetKey(c)===p.setKey&&[1,2,3,4].includes(Number(c.originalRarityId))&&c.cardClass!=='Superstar')}
function stableRarity(c){if(c.originalRarity)return c.originalRarity;return'Unknown'}
function drawFrom(arr,n){const out=[];if(!arr.length)return out;for(let i=0;i<n;i++)out.push(arr[Math.floor(Math.random()*arr.length)]);return out}
function generatePack(p){ensureRewardProfile();const raw=String(p?.setKey||p?.set||p?.key||'CORE').toUpperCase();return generateFiveCardPack(BOOSTER_CONFIG.sets[raw]?raw:'CORE')}
function openNextPack(index=0){ensureRewardProfile();const owned=profile.unopenedPacks[index];if(!owned)return boosterHub();const p=(BOOSTERS.products||[]).find(x=>x.id===owned.id);if(!p)return;const pulls=generatePack(p);profile.unopenedPacks.splice(index,1);profile.openedPacks++;saveProfile();showPackResults(p,pulls)}
function showPackResults(p,pulls){app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="boosterHub()">Back</button><b>${esc(p.name)}</b><span>${pulls.length} pages</span></div><p class="instruction">Added permanently to your collection.</p><div class="library">${pulls.map(c=>staticOriginalCardHtml(c,stableRarity(c),`<div class="originalCardNote">Owned ${collectionCountForCard(c)}</div>`)).join('')}</div><button class="primary" onclick="boosterHub()">Continue</button></section>`}
function boosterHub(){ensureRewardProfile();const packs=profile.unopenedPacks.map((x,i)=>{const p=(BOOSTERS.products||[]).find(y=>y.id===x.id);if(!p)return'';const img=boosterArt(p);return`<article class="card">${img?`<img class="cardArt" src="${img}" alt="${esc(p.name)}">`:''}<div class="cardhead"><h3>${esc(p.name)}</h3><span class="tag">${p.pageCount} pages</span></div><p>${esc(p.description)}</p><button class="primary" onclick="openNextPack(${i})">Open Pack</button></article>`}).join('');app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>BOOSTER REWARDS</b><span>${profile.unopenedPacks.length} unopened</span></div><p class="instruction">One authentic-set booster is awarded after every victory. Cards are stored permanently in your collection.</p><div class="resultStats"><div><b>${profile.openedPacks}</b><span>Packs opened</span></div><div><b>${Object.values(profile.collection).reduce((a,b)=>a+b,0)}</b><span>Pages owned</span></div><div><b>${Object.keys(profile.collection).length}</b><span>Unique pages</span></div></div><div class="library">${packs||'<p class="instruction">Win a match to earn your next booster.</p>'}</div></section>`}

function normaliseVersion(value){const text=String(value||'').trim().replace(/^v/i,'');const match=text.match(/^\d+\.\d+\.\d+/);return match?match[0]:text}
async function checkForNewVersion(){
  if(!navigator.onLine)return false;
  try{
    const response=await fetch(`./version.json?force=${Date.now()}`,{cache:'no-store'});
    if(!response.ok)return false;
    const remote=await response.json();
    const remoteVersion=normaliseVersion(remote?.version);
    const localVersion=normaliseVersion(VERSION);
    if(!remoteVersion||remoteVersion===localVersion){
      sessionStorage.removeItem('wa-update-attempt');
      return false;
    }
    const key=`${localVersion}->${remoteVersion}`;
    const prior=sessionStorage.getItem('wa-update-attempt');
    if(prior===key){
      console.warn('Update reload already attempted; continuing with current build to avoid a reload loop.');
      return false;
    }
    sessionStorage.setItem('wa-update-attempt',key);
    if('serviceWorker' in navigator){
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(async r=>{try{await r.update()}catch{}}));
    }
    const next=new URL(location.href);
    next.searchParams.set('updated',remoteVersion);
    next.searchParams.set('t',String(Date.now()));
    location.replace(next.href);
    return true;
  }catch(err){console.warn('Version check unavailable',err);return false}
}
checkForNewVersion();


// Original Stone Cold card prints only Agility 0 and Technical 1 limits.
// Unlisted methods (Knowledge, Strength and Strike) are unrestricted.
SUPERSTARS.austin.momentumMaximums={Agility:0,Technical:1};
const ORIGINAL_SUPERSTAR_LIMITS={"TheCripplerChrisBenoit.gac":{"Agility":-1,"Knowledge":-1,"Strength":2,"Strike":2,"Technical":-1},"ChrisBenoit2E.gac":{"Agility":5,"Knowledge":-1,"Strength":2,"Strike":-1,"Technical":-1},"ChrisJericho.gac":{"Agility":-1,"Knowledge":-1,"Strength":2,"Strike":3,"Technical":-1},"ChrisJericho2E.gac":{"Agility":5,"Knowledge":-1,"Strength":2,"Strike":-1,"Technical":-1},"EddieGuerrero2E.gac":{"Agility":-1,"Knowledge":5,"Strength":2,"Strike":5,"Technical":-1},"Edge.gac":{"Agility":2,"Knowledge":3,"Strength":3,"Strike":-1,"Technical":-1},"Edge2E.gac":{"Agility":3,"Knowledge":-1,"Strength":3,"Strike":-1,"Technical":-1},"HollywoodHulkHoganLE.gac":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1},"HollywoodHulkHogan2E.gac":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1},"KurtAngle.gac":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":2,"Technical":-1},"KurtAngle2E.gac":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":-1},"Lita.gac":{"Agility":-1,"Knowledge":2,"Strength":1,"Strike":3,"Technical":-1},"Lita2E.gac":{"Agility":-1,"Knowledge":1,"Strength":1,"Strike":3,"Technical":-1},"TheBigShowEX1.gac":{"Agility":0,"Knowledge":1,"Strength":-1,"Strike":-1,"Technical":0},"TheBigShow2E.gac":{"Agility":0,"Knowledge":2,"Strength":-1,"Strike":-1,"Technical":0},"TheUndertakerEX1.gac":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":2},"TheUndertaker2E.gac":{"Agility":0,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":2},"TripleH.gac":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":-1},"TripleH2E.gac":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":-1},"TheRock.gac":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":2},"TheRock2E.gac":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":2},"Kane.gac":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1},"Kane2E.gac":{"Agility":1,"Knowledge":-1,"Strength":-1,"Strike":-1,"Technical":1}};
const SUPERSTAR_VARIANT_SPECS=[
  {base:'benoit',key:'benoit1',label:'CHRIS BENOIT (1ST EDITION)',sourceFile:'TheCripplerChrisBenoit.gac',starterId:'Starter-TheCripplerChrisBenoit',art:'assets/gai/ChrisBenoit.webp',edition:'1st Edition'},
  {base:'benoit',key:'benoit2e',label:'CHRIS BENOIT (2ND EDITION)',sourceFile:'ChrisBenoit2E.gac',starterId:'Starter-ChrisBenoit2E',art:'assets/gai/ChrisBenoit2E.webp',edition:'2nd Edition'},
  {base:'jericho',key:'jericho1',label:'CHRIS JERICHO (PROMO)',sourceFile:'ChrisJericho.gac',starterId:'Starter-ChrisJericho',art:'assets/gai/ChrisJerichoPromo.webp',edition:'Promo'},
  {base:'jericho',key:'jericho2e',label:'CHRIS JERICHO (2ND EDITION)',sourceFile:'ChrisJericho2E.gac',starterId:'Starter-ChrisJericho2E',art:'assets/gai/ChrisJericho2E.webp',edition:'2nd Edition'},
  {base:'eddie',key:'eddie1',label:'EDDIE GUERRERO (EX1)',sourceFile:'EddieGuerreroEX1.gac',starterId:'Starter-EddieGuerrero',art:'assets/gai/EddieGuerreroEX1.webp',edition:'Expansion 1'},
  {base:'eddie',key:'eddie2e',label:'EDDIE GUERRERO (2ND EDITION)',sourceFile:'EddieGuerrero2E.gac',starterId:'Starter-EddieGuerrero2E',art:'assets/gai/EddieGuerrero2E.webp',edition:'2nd Edition'},
  {base:'edge',key:'edge1',label:'EDGE (1ST EDITION)',sourceFile:'Edge.gac',starterId:'Starter-Edge',art:'assets/gai/Edge.webp',edition:'1st Edition'},
  {base:'edge',key:'edge2e',label:'EDGE (2ND EDITION)',sourceFile:'Edge2E.gac',starterId:'Starter-Edge2E',art:'assets/gai/Edge2E.webp',edition:'2nd Edition'},
  {base:'hogan',key:'hoganNwo',label:'HOLLYWOOD HOGAN (nWo)',sourceFile:'HollywoodHulkHoganLE.gac',starterId:'Starter-HulkHoganLE',art:'assets/gai/HollywoodHogan.webp',edition:'nWo / Limited Edition'},
  {base:'hogan',key:'hogan2e',label:'HULK HOGAN (2ND EDITION)',sourceFile:'HollywoodHulkHogan2E.gac',starterId:'Starter-HulkHogan2E',art:'assets/gai/HollywoodHulkHogan2E.webp',edition:'2nd Edition'},
  {base:'angle',key:'angle1',label:'KURT ANGLE (1ST EDITION)',sourceFile:'KurtAngle.gac',starterId:'Starter-KurtAngle',art:'assets/gai/KurtAngle.webp',edition:'1st Edition'},
  {base:'angle',key:'angle2e',label:'KURT ANGLE (2ND EDITION)',sourceFile:'KurtAngle2E.gac',starterId:'Starter-KurtAngle2E',art:'assets/gai/KurtAngle2E.webp',edition:'2nd Edition'},
  {base:'lita',key:'lita1',label:'LITA (1ST EDITION)',sourceFile:'Lita.gac',starterId:'Starter-Lita',art:'assets/gai/Lita.webp',edition:'1st Edition'},
  {base:'lita',key:'lita2e',label:'LITA (2ND EDITION)',sourceFile:'Lita2E.gac',starterId:'Starter-Lita2E',art:'assets/gai/Lita2E.webp',edition:'2nd Edition'},
  {base:'bigshow',key:'bigshow1',label:'THE BIG SHOW (EX1)',sourceFile:'TheBigShowEX1.gac',starterId:'Starter-TheBigShow',art:'assets/gai/TheBigShowEX1.webp',edition:'Expansion 1'},
  {base:'bigshow',key:'bigshow2e',label:'THE BIG SHOW (2ND EDITION)',sourceFile:'TheBigShow2E.gac',starterId:'Starter-TheBigShow2E',art:'assets/gai/TheBigShow2E.webp',edition:'2nd Edition'},
  {base:'undertaker',key:'undertaker1',label:'THE UNDERTAKER (EX1)',sourceFile:'TheUndertakerEX1.gac',starterId:'Starter-TheUndertaker',art:'assets/gai/TheUndertakerEX1.webp',edition:'Expansion 1'},
  {base:'undertaker',key:'undertaker2e',label:'THE UNDERTAKER (2ND EDITION)',sourceFile:'TheUndertaker2E.gac',starterId:'Starter-TheUndertaker2E',art:'assets/gai/TheUndertaker2E.webp',edition:'2nd Edition'},
  {base:'tripleh',key:'tripleh1',label:'TRIPLE H (PROMO)',sourceFile:'TripleH.gac',starterId:'TripleHStarter',art:'assets/gai/TripleHPromo.webp',edition:'Promo'},
  {base:'tripleh',key:'tripleh2e',label:'TRIPLE H (2ND EDITION)',sourceFile:'TripleH2E.gac',starterId:'Starter-TripleH2E',art:'assets/gai/TripleH2E.webp',edition:'2nd Edition'},
  {base:'rock',key:'rock1',label:'THE ROCK (1ST EDITION)',sourceFile:'TheRock.gac',starterId:'Starter-TheRock',art:'assets/gai/Sales-TheRock.webp',edition:'1st Edition'},
  {base:'rock',key:'rock2e',label:'THE ROCK (2ND EDITION)',sourceFile:'TheRock2E.gac',starterId:'Starter-TheRock2E',art:'assets/gai/TheRock2E.webp',edition:'2nd Edition'},
  {base:'kane',key:'kane1',label:'KANE (1ST EDITION)',sourceFile:'Kane.gac',starterId:'Starter-Kane',art:'assets/gai/Sales-Kane.webp',edition:'1st Edition',hp:75},
  {base:'kane',key:'kane2e',label:'KANE (2ND EDITION)',sourceFile:'Kane2E.gac',starterId:'Starter-Kane2E',art:'assets/gai/Kane2E.webp',edition:'2nd Edition',hp:74},
];
const MULTI_VERSION_BASES=new Set(SUPERSTAR_VARIANT_SPECS.map(v=>v.base));
function configureSuperstarVariants(){
  const bySource=Object.fromEntries(cards.filter(c=>c.cardClass==='Superstar').map(c=>[String(c.sourceFile||'').toLowerCase(),c]));
  for(const spec of SUPERSTAR_VARIANT_SPECS){
    const base=SUPERSTARS[spec.base]; if(!base)continue;
    const card=bySource[String(spec.sourceFile).toLowerCase()];
    const variant={...base,key:spec.key,baseKey:spec.base,name:spec.label,displayName:spec.label,edition:spec.edition,sourceFile:spec.sourceFile,starterId:spec.starterId,artOverride:spec.art,hp:spec.hp||base.hp};
    if(card?.description){variant.ability=card.description.split(/\r?\n/)[0];variant.abilityText=card.description;}
    const exactLimits=ORIGINAL_SUPERSTAR_LIMITS[spec.sourceFile];if(exactLimits)variant.momentumMaximums={...exactLimits};
    SUPERSTARS[spec.key]=variant; STARTER_MAP[spec.key]=spec.starterId;
  }
  // Keep legacy base keys functional internally but hide them from selection when edition entries exist.
  Object.assign(SUPERSTARS.flair,{artOverride:'assets/gai/RicFlairEX3.webp',sourceFile:'RicFlairEX3.gac',starterId:'Starter-RicFlair'});STARTER_MAP.flair='Starter-RicFlair';
  Object.assign(SUPERSTARS.alsnow,{artOverride:'assets/gai/sales-AlSnow.webp',edition:'Hardcore Bonus Starter'});
  Object.assign(SUPERSTARS.blackman,{artOverride:'assets/gai/sales-SteveBlackman.webp',edition:'Hardcore Bonus Starter'});
  Object.assign(SUPERSTARS.shane,{artOverride:'assets/gai/sales-ShaneMcMahon.webp',edition:'Hardcore Trio (source deck unresolved)',hardcoreTrio:true});
}
// Editorial WWE prominence during February 2001–January 2003. This controls
// the default character-select order only; it does not alter gameplay strength.
const WWE_ERA_IMPORTANCE_ORDER=[
  'austin','rock','tripleh','undertaker','angle','jericho','hogan','brock','kane','hbk',
  'edge','benoit','bookert','rvd','bigshow','flair','eddie','nash','christian','jeffhardy',
  'matthardy','lita','trish','rey','rikishi','bradshaw','bubba','dvon','test','regal',
  'tazz','xpac','scotthall','goldust','lancestorm','tajiri','hurricane','scotty','spike',
  'alsnow','blackman','shane'
];
const WWE_ERA_IMPORTANCE_RANK=Object.fromEntries(WWE_ERA_IMPORTANCE_ORDER.map((key,index)=>[key,index]));
function superstarBaseKey(s){return s.baseKey||s.key}
function superstarImportanceRank(s){return WWE_ERA_IMPORTANCE_RANK[superstarBaseKey(s)]??999}
function superstarSortBase(s){
  const raw=String(s.baseKey&&SUPERSTARS[s.baseKey]?.name||s.displayName||s.name||'')
    .replace(/\s*\([^)]*\)\s*$/,'').trim();
  return raw.replace(/^THE\s+/i,'').toUpperCase();
}
function superstarReleaseRank(s){
  const e=`${s.edition||''} ${s.sourceFile||''}`.toLowerCase();
  if(/2nd|second|2e/.test(e))return 60;
  if(/unforgiven|ex3/.test(e))return 50;
  if(/summerslam|brocklesnar|shawnmichaels/.test(e))return 45;
  if(/nwo|wrestlemania|limited|\ble\b/.test(e))return 40;
  if(/tlc|expansion 2|ex2/.test(e))return 30;
  if(/no way out|expansion 1|ex1/.test(e))return 20;
  if(/promo|sales|1st|first/.test(e))return 10;
  if(/bonus|special/.test(e))return 35;
  return 25;
}
function superstarSetLabel(s){return String(s.edition||'Core / Other').trim()||'Core / Other'}
function compareSuperstars(a,b,mode='importance'){
  const name=superstarSortBase(a).localeCompare(superstarSortBase(b));
  const newest=superstarReleaseRank(b)-superstarReleaseRank(a);
  const importance=superstarImportanceRank(a)-superstarImportanceRank(b);
  if(mode==='alphabetical')return name||newest;
  if(mode==='set')return superstarSetLabel(a).localeCompare(superstarSetLabel(b))||importance||newest||name;
  if(mode==='release-newest')return newest||importance||name;
  if(mode==='release-oldest')return -newest||importance||name;
  if(mode==='hp-high')return Number(b.hp||0)-Number(a.hp||0)||importance||newest||name;
  if(mode==='hp-low')return Number(a.hp||0)-Number(b.hp||0)||importance||newest||name;
  return importance||newest||name;
}
function selectableSuperstars(mode='importance'){
  return Object.values(SUPERSTARS)
    .filter(s=>!MULTI_VERSION_BASES.has(s.key))
    .sort((a,b)=>compareSuperstars(a,b,mode));
}

const freshJson=path=>fetch(`${path}?build=0.9.106`,{cache:'no-store',headers:{'Cache-Control':'no-cache'}}).then(r=>{if(!r.ok)throw new Error(`${path} failed to load (${r.status})`);return r.json()});
Promise.all([freshJson('data/demo-cards.json'),freshJson('data/artwork-manifest.json'),freshJson('data/authentic-starter-decks.json'),freshJson('data/starter-roster-map.json'),freshJson('data/booster-products.json'),freshJson('data/original-offline-missions.json'),freshJson('data/original-campaign-v0964.json'),freshJson('data/original-card-script-asts.json')]).then(([x,a,st,sm,bp,om,oc,asts])=>{ART=a;STARTERS=st;STARTER_MAP=sm;BOOSTERS=bp;ORIGINAL_MISSIONS=om;ORIGINAL_CAMPAIGN=oc;ORIGINAL_SCRIPT_ASTS=asts||{};AI_DECKS={decks:[]};cards=x.map(enrichCard);configureSuperstarVariants();showLoginScreen()}).catch(err=>app.innerHTML=`<section class="screen"><div class="logo">LOAD ERROR</div><p>${esc(err.message)}</p></section>`);

function enrichCard(c){
  const t=String(c.description||'').toLowerCase(),mods=String(c.modifiers||'').toLowerCase();
  const counterMap={'mad rush':'Mad Rush','in close':'In Close','arm extended':'Arm Extended','leg extended':'Leg Extended','back to foe':'Back To Foe','victim below':'Victim Below','head down':'Head Down','grounded':'Grounded'};
  const inferred=[...(c.counters||[])];
  Object.entries(counterMap).forEach(([needle,pos])=>{if(t.includes(`counters ${needle}`)||t.includes(`counter ${needle}`))inferred.push(pos)});
  const draw=(t.match(/draw (?:one |a |1 |two |2 )?page/g)||[]).reduce((n,x)=>n+(x.includes('two')||x.includes('2 ')?2:1),0);
  let requirement=c.requirement||null;
  const minTurnMatch=t.match(/(?:only )?after turn (\d+)/); const minTurn=minTurnMatch?Number(minTurnMatch[1])+1:(c.minTurn||null);
  const momentumRequirements={...(c.playMomentumRequirements||c.momentumRequirements||{})};
  const discardSelf=(t.match(/discard (?:any |up to )?(one|1|two|2|three|3) page(?:s)? from your hand/)||[])[1];
  const discardOpponentMatch=t.match(/opponent (?:discards?|ditches) (?:a|one|1|two|2|three|3) (?:random )?pages?/);
  const discardOpponent=discardOpponentMatch?(discardOpponentMatch[1]==='two'||discardOpponentMatch[1]==='2'?2:discardOpponentMatch[1]==='three'||discardOpponentMatch[1]==='3'?3:1):0;
  const millMatch=t.match(/opponent(?:'s)? next (one|1|two|2|three|3|four|4) pages? (?:from |in )?(?:the )?playbook (?:are|is) ditched/);
  const millOpponent=millMatch?({one:1,'1':1,two:2,'2':2,three:3,'3':3,four:4,'4':4}[millMatch[1]]||0):0;
  const opponentAttitudeLoss=(t.match(/opponent loses (\d+) attitude/)||[])[1]|0;
  const discardNonMomentum=/opponent (?:discards?|ditches) a random page from hand that isn'?t momentum/.test(t);
  const opponentAttitudeGain=(t.match(/opponent (?:gains?|gets?) (\d+) attitude/)||[])[1]|0;
  const discardAllStrength=/ditches all strength moves in hand/.test(t);
  const discardTwoIfFour=/unless your opponent has less than 4 pages in hand, your opponent (?:discards?|ditches) 2 random pages/.test(t);
  const recover=/recover (?:a|one|1) page/.test(t)?1:0;
  const preventDamage=/does no damage|prevent all damage/.test(t);
  return {...c,counters:[...new Set(inferred)],counterOnly:c.counterOnly||t.includes('play only as a counter')||t.includes('only be played as a counter'),face:mods.includes('face')||t.includes('(face page'),heel:mods.includes('heel')||t.includes('(heel page'),drawEffect:draw,requirement,hold:mods.includes('hold')||t.includes('each turn')&&t.includes('hold'),releaseChance:(t.match(/(\d+)% chance that this hold is released/)||[])[1]/100||null,conditionalStun:t.includes('if your opponent is not stunned')&&t.includes('stunned'),damageBonus:t.includes('up to +3 damage')?3:t.includes('up to +2 damage')?2:0,minTurn,momentumRequirements,discardSelf:discardSelf?(discardSelf==='two'||discardSelf==='2'?2:discardSelf==='three'||discardSelf==='3'?3:1):0,discardOpponent,millOpponent,opponentAttitudeLoss,discardNonMomentum,opponentAttitudeGain,discardAllStrength,discardTwoIfFour,recoverEffect:recover,preventDamage,
    chanceMillNext:(t.match(/(\d+)% chance (?:your )?opponent(?:'s)? next page (?:is|from .* is) ditched/)||[])[1]|0,
    millFixed:(t.match(/opponent(?:'s)? next (\d+) pages? (?:from |in )?(?:the )?playbook (?:are|is) ditched/)||[])[1]|0,
    millByAttitude:/ditches pages from (?:his|their) playbook equal to your attitude momentum/.test(t),
    millByTechStrength:/ditches pages from (?:his|their) playbook equal to the amount of technical and strength momentum you have/.test(t),
    discardRandomHand:(t.match(/ditches? (?:a|one|1|two|2) random pages?/)||[])[1]?(RegExp.$1==='two'||RegExp.$1==='2'?2:1):0,
    extraZoneDamage:(()=>{const m=t.match(/takes (\d+) (arm|head|leg|body|back) damage/);return m?{amount:Number(m[1]),zone:m[2][0].toUpperCase()+m[2].slice(1)}:null})(),
    selfDamage:(t.match(/you take (\d+) damage/)||[])[1]|0,
    gainAttitude:(t.match(/gain \+(\d+) attitude/)||[])[1]|0,
    setsRingside:/opponent is moved to ringside/.test(t),
    putOnMat:/opponent is put on the mat/.test(t),
    discardRandomGameplan:/one of your opponent(?:'s)? gameplans/.test(t),
    discardRandomSpecial:/random special/.test(t),
    uncounterable:c.uncounterable||t.includes("can't be countered")||t.includes('cannot be countered'),
    requiresInPlay:(()=>{const m=t.match(/(?:only if|requires?) (?:a |an |the )?([a-z0-9' -]+?) is in play/);return m?m[1].trim():null})(),
    removeOpponentSupport:/opponent(?:'s)? support is removed from play/.test(t),
    removeOpponentDamageSpecials:/opponent(?:'s)? damage specials are removed from play/.test(t),
    removeOpponentGameplans:/all of your opponent(?:'s)? gameplan specials that are in play are ditched/.test(t),
    removeRefereeSpecial:/referee special in play is removed/.test(t),
    removeWhenStunned:/removed from play when you are stunned/.test(t),
    onlyOneInPlay:/only have one .* in play|only one .* may be in play/.test(t),
    randomDuration:(()=>{const m=t.match(/for (\d+) to (\d+) turns?/);return m?{min:Number(m[1]),max:Number(m[2])}:null})()};
}

const esc=v=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const artKey=v=>String(v||'').replace(/\.[^.]+$/,'').toLowerCase().replace(/[^a-z0-9]+/g,'');
function cardArt(c){const keys=[c.preferredArtSource,c.sourceFile,c.id,c.name];for(const k of keys){const hit=ART.assets?.[artKey(k)];if(hit)return hit.file}return ''}
function starArt(key){
  const superstar=SUPERSTARS[key];
  if(!superstar)return'';
  if(superstar.artOverride)return superstar.artOverride;
  const exactCard=cards.find(c=>c.cardClass==='Superstar'&&String(c.sourceFile||'').toLowerCase()===String(superstar.sourceFile||'').toLowerCase());
  if(exactCard){const exact=cardArt(exactCard);if(exact)return exact}
  const verified={
    flair:'assets/gai/RicFlairEX3.webp',
    nash:'assets/gai/KevinNashEX3.webp',
    trish:'assets/gai/TrishStratusEX3LE.webp',
    scotty:'assets/gai/Scotty2HottyEX1.webp'
  };
  if(verified[key])return verified[key];
  const manifest=ART.superstars?.[key]?.file||'';
  if(manifest){
    const bad=['RicFlair.webp','KevinNash.webp','TrishStratus.webp'];
    if(!bad.some(x=>manifest.endsWith(x)))return manifest;
  }
  const named=cards.find(c=>c.cardClass==='Superstar'&&String(c.name||'').toLowerCase()===String(superstar.name||'').toLowerCase());
  return named?cardArt(named):'';
}
const MOMENTUM_ICON_FILES={
  Agility:'assets/gai/front-agility.webp',
  Knowledge:'assets/gai/front-knowledge.webp',
  Strength:'assets/gai/front-strength.webp',
  Strike:'assets/gai/front-strike.webp',
  Technical:'assets/gai/front-technical.webp',
  Attitude:'assets/gai/button-wwf-attitude.webp'
};
function momentumIcons(wrestler){
  const momentum=wrestler?.momentum||{};
  return MOM_TYPES.map(type=>{
    const src=MOMENTUM_ICON_FILES[type]||'';
    const value=Number(momentum[type]||0);
    return `<span class="momIcon" title="${esc(type)} Momentum">${src?`<img src="./${esc(src)}" alt="${esc(type)}" loading="eager" decoding="async" onerror="this.hidden=true">`:''}<b>${value}</b></span>`;
  }).join('');
}
function artImg(src,cls='cardArt',alt='',loading='lazy'){return src?`<img class="${cls}" src="./${esc(src).replace(/^\.\//,'')}" alt="${esc(alt)}" loading="${loading}" decoding="async" onerror="this.hidden=true">`:''}
function preloadMatchArt(side){side.hand.forEach(c=>{const src=cardArt(c);if(src){const img=new Image();img.src='./'+src.replace(/^\.\//,'')}})}

function shuffle(a){a=[...a];for(let i=a.length-1;i;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function poolFor(key){return cards.filter(c=>!c.owner||c.owner===key).filter(c=>c.cardClass!=='Entrance')}
function starterForKey(key){const id=STARTER_MAP[key];return (STARTERS.starters||[]).find(s=>s.id===id)||null}
function starterStatus(key){
  const starter=starterForKey(key);
  if(!starter)return{ready:false,total:0,mapped:0,missing:0,reason:'No original starter package is mapped.'};
  const valid=starter.entries.filter(e=>e.cardId&&cards.some(c=>c.id===e.cardId));
  const missing=starter.entries.length-valid.length;
  return{ready:missing===0,total:starter.entries.length,mapped:valid.length,missing,starter,reason:missing?`${missing} original pages are not yet mapped or supported.`:''};
}
function defaultDeckIds(key){
  const st=starterStatus(key);
  if(!st.starter)return[];
  return st.starter.entries.map(e=>e.cardId).filter(Boolean);
}
function deckIds(key){if(selectedDeckMode==='custom'&&profile.decks?.[key]?.length)return profile.decks[key];if(selectedDeckMode==='ai'&&selectedRecommendedDeck?.superstar===key)return selectedRecommendedDeck.deckIds;return defaultDeckIds(key)}
function ensureOpeningMix(deck){return deck}
function buildDeck(key){
  let ids;
  if(key===selectedSuperstar&&selectedDeckMode==='ai'&&selectedRecommendedDeck)ids=selectedRecommendedDeck.deckIds;
  else if(key===selectedSuperstar&&selectedDeckMode==='custom'&&profile.decks?.[key]?.length)ids=profile.decks[key];
  else {const st=starterStatus(key);if(!st.ready)return[];ids=st.starter.entries.map(e=>e.cardId).filter(Boolean)}
  const pool=poolFor(key);const made=ids.map((id,i)=>{const c=pool.find(x=>x.id===id)||cards.find(x=>x.id===id);return c&&c.cardClass!=='Superstar'&&!c.unplayable?{...c,instance:`${key}-${selectedDeckMode}-${i}-${Math.random()}`}:null}).filter(Boolean);
  return [...made.slice(0,HAND_SIZE),...shuffle(made.slice(HAND_SIZE))];
}
function recordFor(key){return profile.stats?.[key]||{wins:0,losses:0,matches:0}}

function methodsFor(style){const base={Strike:2,Strength:2,Technical:2,Knowledge:1,Agility:1};if(style==='power')base.Strength=3;if(style==='brawler')base.Strike=3;if(style==='technical')base.Technical=3;if(style==='submission'){base.Technical=3;base.Knowledge=2}if(style==='agile')base.Agility=3;return base}
function emptyMomentum(){return Object.fromEntries(MOM_TYPES.map(x=>[x,0]))}
function totalMomentum(s){return MOM_TYPES.reduce((n,x)=>n+(s.momentum[x]||0),0)}
function methodMomentumLimit(k,type){if(type==='Attitude')return MAX_MOM;const star=SUPERSTARS[side(k).rosterKey]||SUPERSTARS[side(k).superKey]||{};const limits=star.momentumMaximums||{};if(!Object.prototype.hasOwnProperty.call(limits,type))return MAX_MOM;const raw=Number(limits[type]);return Number.isFinite(raw)&&raw>=0?raw:MAX_MOM}
function momentumGainRoom(k,type){return Math.max(0,methodMomentumLimit(k,type)-(side(k).momentum[type]||0))}
const ORIGINAL_SUPERSTAR_BASE_UNIDS={"austin":2,"rock":69,"tripleh":147,"undertaker":274,"kane":7,"angle":250,"jericho":204,"benoit":792,"bigshow":273,"bookert":489,"edge":342,"christian":502,"eddie":270,"rvd":479,"flair":1052,"hogan":515,"nash":1028,"jeffhardy":480,"matthardy":488,"lita":271,"trish":994,"bubba":490,"dvon":491,"spike":1020,"bradshaw":1019,"goldust":1027,"lancestorm":1029,"rikishi":185,"scotty":314,"tajiri":1181,"tazz":179,"test":305,"hurricane":971,"regal":275,"xpac":149,"alsnow":230,"blackman":229,"brock":1085,"shane":228,"hbk":1090,"scotthall":516,"rey":1177};
function deckFromOriginalIds(ids){const byUnid=new Map(cards.map(c=>[Number(c.originalUNID),c]));const resolved=(ids||[]).map(id=>byUnid.get(Number(id))).filter(Boolean);const playable=resolved.filter(c=>c.cardClass!=='Superstar'&&!c.nonDrawResource);const lead=playable.slice(0,HAND_SIZE);const rest=shuffle(playable.slice(HAND_SIZE));return [...lead,...rest].map(c=>({...c}))}
function createSide(slot,rosterKey,originalDeckIds=null){const star=SUPERSTARS[rosterKey],superKey=star.baseKey||rosterKey,deck=originalDeckIds?deckFromOriginalIds(originalDeckIds):buildDeck(rosterKey),originalUNID=ORIGINAL_SUPERSTAR_BASE_UNIDS[rosterKey]??ORIGINAL_SUPERSTAR_BASE_UNIDS[superKey]??null;return{key:slot,rosterKey,superKey,originalUNID,baseUNID:originalUNID,name:star.name,maxHp:star.hp,hp:star.hp,momentum:emptyMomentum(),deck,hand:deck.splice(0,HAND_SIZE),discard:[],stun:0,stunUntilTurn:-1,stunSource:null,abilityUsed:false,buffs:{nextDamage:0,nextDiscount:0,damageShield:0,momentumTax:0},inPlay:[],pins:0,kickouts:0,escapes:0,recoveries:0,counters:0,alignment:null,methods:methodsFor(star.style),zoneDamage:{Head:0,Arm:0,Leg:0,Body:0},submissionDamage:{Head:0,Arm:0,Leg:0,Back:0},warnings:0,pagesDrawn:0,hitStreak:0,connectedMoves:[],pendingCallingForIt:false,pendingGotAllOfIt:false,hitStreakMethods:[],latinoHeatUses:0,stephanieUsed:false,undertakerCounterDraws:0,kaneStunIgnored:false,lastConnectedMethod:null,abilityUses:0,bodyThresholds:{Head:0,Arm:0,Leg:0,Body:0},playedMoveThisTurn:false,momentumPlayedSinceSuccess:false,keptHoldThisTurn:false,lastTurnConnectedMethod:null,impactStreak:0,lanceSerious:false,christianUses:0,eventsPlayed:0,eventNamesPlayed:[],specialPlayedThisTurn:false,autocounters:0,pinReactionsUsed:{},affectPinScore:0,nextMoveFlags:{},alwaysThinking:0,nashAbilityUsed:false,trishAbilityUsed:false,trishNoMoves:false,trishNextUncounterable:false,bubbaUses:0,dvonUses:0,hurricaneAbilityUsed:false,hurricaneBorrowedMomentum:null,scottyUses:0,scottyUsedThisString:false,momentumPagesPlayed:0,blackmanCounterDraws:0,scottHallStrikeUses:0,scottHallStrengthUses:0,damageSpecialArmed:false,shanePinPenalty:0,eddieMethodsDrawn:[],hoganFaceSpecialUses:0,gMoneyLastTurn:-99,location:'InTheRing',turnsAtLocation:0,onMat:false}}
function entrance(slot){return false}
function start(){cancelCpuTurn();stopMusic();stopCrowd();playMusic(ENTRANCE_AUDIO[selectedSuperstar]||'AppBackground',{loop:false,volume:.55});setTimeout(()=>{playSfx('Bell',.9);playCrowd()},1200);const pd=starterStatus(selectedSuperstar),od=starterStatus(selectedOpponent);if(!pd.ready||(!od.ready&&!activeMission?.originalAiDeckIds)){alert('Both wrestlers need complete decks before a match can begin.');return superstarSelect()}const p=SUPERSTARS[selectedSuperstar],o=SUPERSTARS[selectedOpponent];state={player:createSide('player',selectedSuperstar),cpu:createSide('cpu',selectedOpponent,activeMission?.originalAiDeckIds||null),ended:false,matchId:Date.now()+Math.random(),control:'player',position:'Standing',pile:null,log:[],message:activeMission?.originalTitle||'The bell rings. Choose a legal page.',round:1,busy:false,inputLockUntil:0,inputLockName:'',actionSerial:0,hold:null,lastFinisher:null,reversalDepth:0,totalCounters:0,cardOverlay:null,choiceOverlay:null,awaitingCpuMoveAck:false,awaitingAutoCounterAck:false,pendingAutoCounterControl:null,autoCounterSummary:null,pileFlipped:false,autoCounterPhase:false,turnLimit:selectedMatchTurnLimit,gameMap:['InTheRing','Ringside'],matchType:'Standard'};entrance('player');entrance('cpu');for(const who of ['player','cpu'])if(side(who).superKey==='hbk'){side(who).zoneDamage.Body=6;side(who).hp=Math.max(0,side(who).hp-6);addLog(`${side(who).name} starts with 6 back damage.`)}if(state.player.superKey==='angle')gainMomentum('player','Knowledge',1);if(state.cpu.superKey==='angle')gainMomentum('cpu','Knowledge',1);preloadMatchArt(state.player);preloadMatchArt(state.cpu);addLog(`${p.name} begins with 0 momentum.`);addLog(`${o.name} begins with 0 momentum.`);dispatchOriginalEvent('Begin_Game','player');dispatchOriginalEvent('Begin_Game','cpu');render()}
const side=k=>state[k],other=k=>k==='player'?'cpu':'player';
function drawTo(k,n=HAND_SIZE){const s=side(k);while(s.hand.length<n&&s.deck.length){s.hand.push(s.deck.shift());s.pagesDrawn++}}
function drawPages(k,n){const s=side(k);while(n-->0&&s.deck.length){s.hand.push(s.deck.shift());s.pagesDrawn++}}
function stunRemainingTurns(k){
  const s=side(k);if(!s)return 0;
  const until=Number(s.stunUntilTurn??-1),now=Number(state?.round||0);
  return until>=now?until-now+1:0;
}
function isCurrentlyStunned(k){return stunRemainingTurns(k)>0}
function syncStunState(k){const s=side(k);if(!s)return 0;s.stun=stunRemainingTurns(k);if(!s.stun){s.stunUntilTurn=-1;s.stunSource=null}return s.stun}
function canPlayWhileStunned(card){
  const f=String(card?.sourceFile||'');
  if(/^(?:ToughGuy|ToughGuy2E|BackToTheWellOnceToOften|OnceTooOften2E|ThatWasThree2E|HeyRefThatWasThree|GetAShoulderUp)\.gac$/i.test(f))return true;
  return /(?:may|can) (?:use|play)(?: this page)? (?:even )?(?:if|while) (?:you are )?stunned/i.test(String(card?.description||''));
}
function applyCertifiedStun(targetKey,sourceCard,duration,sourceKey=null){
  if(!state||state.ended)return false;
  const target=side(targetKey),source=sourceKey?side(sourceKey):side(other(targetKey));
  const n=Math.max(0,Number(duration)||0);if(!target||!n)return false;

  // Original Can_Stun lifecycle: Superstar and in-play pages may veto the stun.
  const allowed=originalBooleanGate('Can_Stun',targetKey,sourceCard||null,{
    '#superstar':target,'#target':target,'#initiator':source||target,
    '#incontrol':side(state.control),'#source':sourceCard||null
  });
  if(!allowed){syncStunState(targetKey);addLog(`${target.name} prevents the Stun.`);return false}

  // Kane's printed original ability: ignore the first Stun received.
  if(target.superKey==='kane'&&!target.kaneStunIgnored){
    target.kaneStunIgnored=true;addLog(`${target.name} ignores the first Stun received.`);return false;
  }

  // Hardcore EX3: cannot be stunned while its five-turn effect is in play.
  if(target.inPlay.some(e=>e.hardcore&&/^HardcoreEX3\.gac$/i.test(String(e.sourceFile||e.card?.sourceFile||'')))){
    addLog(`${target.name} cannot be Stunned while Hardcore is active.`);return false;
  }

  // WAStun values are inclusive of the current turn:
  // 1=end current turn, 2=end next turn, 3=end following two turns.
  const requestedUntil=Number(state.round||0)+n-1;
  const wasStunned=isCurrentlyStunned(targetKey);
  target.stunUntilTurn=Math.max(Number(target.stunUntilTurn??-1),requestedUntil);
  target.stunSource=sourceCard?.name||sourceCard?.sourceFile||'Original effect';
  syncStunState(targetKey);
  addLog(`${target.name} is Stunned through the end of turn ${target.stunUntilTurn}${sourceCard?.name?` by ${sourceCard.name}`:''}.`);

  // Pages with the printed "removed from play when you are Stunned" condition
  // leave play immediately when the Stun is successfully applied.
  if(!wasStunned){
    const removed=target.inPlay.filter(e=>e.removeWhenStunned);
    if(removed.length){
      target.inPlay=target.inPlay.filter(e=>!e.removeWhenStunned);
      for(const e of removed){
        dispatchOriginalEvent('Out_Of_Play',targetKey,e.card||e,{'#page':e.card||e});
        target.discard.push(e.card||e);
        if(e.alwaysThinking)target.alwaysThinking=Math.max(0,(target.alwaysThinking||0)-1);
        addLog(`${target.name}'s ${e.name} leaves play because ${target.name} is Stunned.`);
      }
    }
    dispatchOriginalEvent('Stunned',targetKey,sourceCard||null,{'#superstar':target,'#source':sourceCard||null});
  }
  return true;
}
globalThis.applyCertifiedStun=applyCertifiedStun;
function consumeTurnStartStun(k){
  const stunned=side(k);syncStunState(k);if(!isCurrentlyStunned(k))return false;
  const remaining=stunRemainingTurns(k);
  state.message=`${stunned.name} is Stunned and cannot play Moves, Counters or Specials this turn.`;
  addLog(`${stunned.name} loses the action opportunity while Stunned${remaining>1?` (${remaining-1} future turn${remaining-1===1?'':'s'} also covered)`:''}.`);
  // This control opportunity is the stunned turn. It ends normally by passing control.
  if(Number(stunned.stunUntilTurn)===Number(state.round)){stunned.stunUntilTurn=-1;stunned.stun=0;stunned.stunSource=null;addLog(`${stunned.name} is no longer Stunned at the end of the turn.`)}
  changeControlCertified(other(k),'after the Stunned turn');
  beginTurn(state.control);return true;
}
function finishNonVictoryMatch(reason){
  if(!state||state.ended)return true;
  cancelCpuTurn();
  pendingChoiceHandler=null;
  state.choiceOverlay=null;
  invalidateScheduledActions();
  state.ended=true;
  state.winner=null;
  state.busy=true;
  state.hold=null;
  state.pinPending=null;
  state.awaitingCpuMoveAck=false;state.awaitingAutoCounterAck=false;state.pendingAutoCounterControl=null;state.autoCounterSummary=null;
  if(state.pinTimer){clearInterval(state.pinTimer);state.pinTimer=null}
  state.message=reason;
  addLog(reason);
  stopCrowd();stopMusic();
  render();
  return true;
}
function resolveMatchTimeLimit(){
  return finishNonVictoryMatch('The match turn limit has been reached. The game is a draw.');
}

function originalGameMapValue(key){
  const values=state?.gameMap?.waValues;
  return values&&Object.prototype.hasOwnProperty.call(values,key)?values[key]:0;
}
function atLocation(k,location){return String(side(k)?.location||'InTheRing')===String(location)}
function setMatchLocation(k,location,{grounded=null,reason=''}={}){
  const s=side(k);if(!s)return false;
  const before=s.location||'InTheRing';
  s.location=String(location).replace(/^\$/,'');
  s.turnsAtLocation=0;
  if(grounded!==null)s.onMat=!!grounded;
  if(k===other(state.control)&&grounded!==null)state.position=grounded?'Grounded':'Standing';
  if(before!==s.location)addLog(`${s.name} moves from ${before} to ${s.location}${reason?` (${reason})`:''}.`);
  return true;
}
function countOutSuppressed(){
  return refereeDistracted()||Number(originalGameMapValue('RefDistracted'))===1||
    Number(originalGameMapValue('RefNoCountOut'))===1;
}
function resolveRingsideCountOut(){
  if(!state||state.ended||countOutSuppressed())return false;
  const controller=state.control;
  const active=side(controller);
  if(!active||!atLocation(controller,'Ringside')||(active.turnsAtLocation||0)<5)return false;

  // Exact Ring.gah condition: WARandom 1 100 >= 50.
  const roll=1+Math.floor(Math.random()*100);
  addLog(`Count-out check for ${active.name}: referee roll ${roll} (50 or higher disqualifies).`);
  if(roll<50){
    state.message=`Referee: ${active.name}, get back in the ring or you may be disqualified!`;
    addLog(state.message);
    return false;
  }

  const outside=['player','cpu'].filter(k=>atLocation(k,'Ringside'));
  if(outside.length===2){
    return finishNonVictoryMatch('Both Superstars are counted out at Ringside. The match is a draw.');
  }
  const loser=outside[0]||controller,winner=other(loser);
  addLog(`${side(loser).name} is counted out.`);
  end(winner==='player',`${side(winner).name} wins by count-out`);
  return true;
}
function advanceLocationTurns(){
  for(const k of ['player','cpu']){
    const s=side(k);
    if(!s)continue;
    if(atLocation(k,'Ringside'))s.turnsAtLocation=Math.max(0,Number(s.turnsAtLocation)||0)+1;
    else s.turnsAtLocation=0;
  }
}
function claimMatchAction(name,windowMs=700){
  if(!state||state.ended)return false;
  const now=(typeof performance!=='undefined'&&performance.now)?performance.now():Date.now();
  if(now<Number(state.inputLockUntil||0))return false;
  state.inputLockUntil=now+Math.max(100,Number(windowMs)||700);
  state.inputLockName=String(name||'action');
  state.actionSerial=(Number(state.actionSerial)||0)+1;
  return true;
}
function releaseMatchAction(name=''){
  if(!state)return;
  if(!name||state.inputLockName===name){
    state.inputLockUntil=0;
    state.inputLockName='';
  }
}
function invalidateScheduledActions(){
  if(!state)return;
  state.actionSerial=(Number(state.actionSerial)||0)+1;
  state.inputLockUntil=0;
  state.inputLockName='';
}
function canUseLocationAction(k){
  const s=side(k);
  return !!state&&!state.ended&&!state.busy&&state.control===k&&!state.hold&&
    !s.specialPlayedThisTurn&&!state.awaitingCpuMoveAck;
}
function takeItInside(k='player'){
  if(k==='player'&&!claimMatchAction('take-it-inside'))return false;
  if(!canUseLocationAction(k)||!atLocation(k,'Ringside')){if(k==='player')releaseMatchAction('take-it-inside');return false;}
  const s=side(k),oppKey=other(k),opp=side(oppKey);
  setMatchLocation(k,'InTheRing',{grounded:false,reason:'Take It Inside'});
  if(atLocation(oppKey,'Ringside')){
    setMatchLocation(oppKey,'InTheRing',{grounded:true,reason:'brought back inside'});
    opp.onMat=true;
    if(oppKey===other(k))state.position='Grounded';
    addLog(`${opp.name} is put on the mat when both Superstars return to the ring.`);
  }
  s.specialPlayedThisTurn=true;
  state.message=`${s.name} takes the action back inside the ring.`;
  addLog(`${s.name} uses the turn's Special action to Take It Inside.`);
  render();
  if(k==='cpu')scheduleCpuTurn(300);
  return true;
}
function moveOutside(k='player'){
  if(k==='player'&&!claimMatchAction('move-outside'))return false;
  if(!canUseLocationAction(k)||!atLocation(k,'InTheRing')){if(k==='player')releaseMatchAction('move-outside');return false;}
  if(!['player','cpu'].some(x=>atLocation(x,'Ringside'))){
    if(k==='player')releaseMatchAction('move-outside');
    return false;
  }
  const s=side(k);
  setMatchLocation(k,'Ringside',{grounded:false,reason:'Move Outside'});
  s.specialPlayedThisTurn=true;
  state.message=`${s.name} moves outside to Ringside.`;
  addLog(`${s.name} uses the turn's Special action to Move Outside.`);
  render();
  if(k==='cpu')scheduleCpuTurn(300);
  return true;
}
function ringsideActionButton(k='player'){
  if(!canUseLocationAction(k))return '';
  if(atLocation(k,'Ringside'))return `<button class="secondary" onclick="takeItInside('${k}')">Take It Inside</button>`;
  if(atLocation(k,'InTheRing')&&['player','cpu'].some(x=>x!==k&&atLocation(x,'Ringside')))
    return `<button class="secondary" onclick="moveOutside('${k}')">Move Outside</button>`;
  return '';
}
function beginTurn(k){
  if(!state||state.ended)return false;
  const configuredTurnLimit=Math.max(1,Number(state.turnLimit)||DEFAULT_MATCH_TURN_LIMIT);
  if((Number(state.round)||0)>=configuredTurnLimit){
    resolveMatchTimeLimit();
    return false;
  }
  advanceLocationTurns();if(resolveRingsideCountOut())return false;dispatchOriginalEvent('Begin_Refresh',k);for(const who of ['player','cpu']){const z=side(who);z.trishNoMoves=false;if(z.hurricaneBorrowedMomentum){for(const [t,n] of Object.entries(z.hurricaneBorrowedMomentum))z.momentum[t]=Math.max(0,(z.momentum[t]||0)-n);z.hurricaneBorrowedMomentum=null}}side(k).momentumPlayedSinceSuccess=false;side(k).playedMoveThisTurn=false;side(k).keptHoldThisTurn=false;side(k).scottyUsedThisString=false;side(k).specialPlayedThisTurn=false;drawPages(k,1);if((side(k).alwaysThinking||0)>0){const peek=side(k).deck.slice(0,side(k).alwaysThinking).map(x=>x.name).join(', ');if(peek)addLog(`${side(k).name} sees next: ${peek}.`)}state.round++;addLog(`TURN ${state.round}: ${side(k).name} is in control and draws one page.`);if(state.round===20){if(state.player.superKey==='angle'){gainMomentum('player','Knowledge',1);addLog(`${state.player.name} gains 1 Knowledge on turn 20.`)}if(state.cpu.superKey==='angle'){gainMomentum('cpu','Knowledge',1);addLog(`${state.cpu.name} gains 1 Knowledge on turn 20.`)}}if(state.round%5===0){for(const x of ['player','cpu'])if(side(x).superKey==='nash'){gainMomentum(x,'Attitude',1);addLog(`${side(x).name} gains 1 Attitude at the end of the fifth turn.`)}}for(const x of ['player','cpu'])if(side(x).superKey==='brock'&&state.round%6===0){gainMomentum(x,'Strength',1);addLog(`${side(x).name} gains 1 Strength on turn ${state.round}.`)}if(side(k).superKey==='hbk'){const tossed=side(k).hand.filter(c=>(Number(c.willpower)||0)>=2);if(tossed.length){side(k).hand=side(k).hand.filter(c=>!tossed.includes(c));side(k).discard.push(...tossed);addLog(`${side(k).name} ditches ${tossed.length} page(s) with Willpower 2 or more.`)}}if(consumeTurnStartStun(k))return false;dispatchOriginalEvent('End_Refresh',k);return true}
function actualCost(card,key){const s=side(key);let limbTax=0;if(card.requirement==='Agility'&&s.zoneDamage.Leg>=10)limbTax++;if((card.requirement==='Strength'||card.requirement==='Strike')&&s.zoneDamage.Arm>=10)limbTax++;return Math.max(0,(Number(card.momentumCost)||0)-(s.buffs.nextDiscount||0)+limbTax+(s.buffs.momentumTax||0))}
function gainMomentum(k,type,amount){const st=side(k);type=MOM_TYPES.includes(type)?type:'Attitude';const before=st.momentum[type]||0;const requested=Math.max(0,Number(amount)||0);const limit=methodMomentumLimit(k,type);st.momentum[type]=Math.min(limit,before+requested);const actual=st.momentum[type]-before;if(state&&actual>0)addLog(`${st.name}: ${type} ${before} → ${st.momentum[type]}.`);if(state&&requested>actual&&type!=='Attitude')addLog(`${st.name} is at the original ${type} maximum of ${limit}.`);return actual}
function spendMomentum(k,amount,preferred){const s=side(k);let left=Math.max(0,Number(amount)||0);const order=['Attitude',preferred,...MOM_TYPES].filter((x,i,a)=>x&&a.indexOf(x)===i);for(const t of order){const use=Math.min(left,s.momentum[t]||0);s.momentum[t]-=use;left-=use;if(!left)break}return left===0}
function payCardCost(k,card){
  // Original WA move costs are play thresholds, not a payment. The five
  // method Momentum pools remain permanently in play once gained; Attitude
  // also remains unless a rule, pin, or printed card effect changes it.
  return totalMomentum(side(k))>=actualCost(card,k);
}
function refereeSpecialsInPlay(){
  const refs=[];
  for(const k of ['player','cpu'])for(const e of side(k).inPlay){
    const name=String(e.name||e.card?.name||'');
    const desc=String(e.description||e.card?.description||'');
    if(/referee/i.test(name)||/\bReferee\b/.test(desc))refs.push({owner:k,page:e,name});
  }
  return refs;
}
function refereeDistracted(){
  if(Number(originalGameMapValue('RefDistracted'))===1)return true;
  return ['player','cpu'].some(k=>side(k).inPlay.some(e=>
    /distract the referee/i.test(String(e.name||e.card?.name||''))||
    /distracted referee/i.test(String(e.description||e.card?.description||''))
  ));
}
function warningsDisabled(){
  if(refereeDistracted())return {disabled:true,reason:'The distracted referee does not give Warnings.'};
  for(const k of ['player','cpu'])for(const e of side(k).inPlay){
    const name=String(e.name||e.card?.name||'');
    const desc=String(e.description||e.card?.description||'');
    if(/General Manager Eric Bischoff/i.test(name)||/No warnings can be given/i.test(desc)){
      return {disabled:true,reason:`${name||'An in-play effect'} prevents Warnings.`};
    }
  }
  return {disabled:false,reason:''};
}
function matchSupportsDisqualification(){
  const type=String(state?.matchType||'Standard').toLowerCase();
  if(/hardcore|no\s*dq|no disqualification/.test(type))return false;
  const warningState=warningsDisabled();
  if(warningState.disabled&&/No warnings can be given/.test(warningState.reason))return false;
  return true;
}
function warningThreshold(){
  // Original default is 5. Referee Mike Chioda raises the threshold by 4.
  return refereeSpecialsInPlay().some(r=>/Mike Chioda/i.test(r.name))?9:5;
}
function goodOfficiatingExtraWarnings(k){
  if(!state)return 0;
  state.warningTurnFlags=state.warningTurnFlags||{};
  const key=`${state.round||0}:${k}`;
  if(state.warningTurnFlags[key])return 0;
  const opponent=other(k);
  const hasGood=side(opponent).inPlay.some(e=>/Good Officiating/i.test(String(e.name||e.card?.name||'')));
  const hasRef=refereeSpecialsInPlay().length>0;
  if(!hasGood||!hasRef)return 0;
  state.warningTurnFlags[key]=true;
  return 4;
}
function runDisqualificationCheck(k){
  const s=side(k),threshold=warningThreshold();
  if(!matchSupportsDisqualification()){
    addLog(`No disqualification check is made in this match.`);
    return false;
  }
  if((s.warnings||0)<threshold)return false;
  const chance=Math.min(1,(s.warnings||0)*0.05);
  const roll=Math.random();
  addLog(`${s.name} has ${s.warnings} Warnings. DQ check: ${Math.round(chance*100)}% chance (5% per Warning; threshold ${threshold}).`);
  if(roll<chance){
    addLog(`${s.name} is disqualified.`);
    end(k!=='player',`${s.name} is disqualified`);
    return true;
  }
  addLog(`${s.name} is not disqualified on this check.`);
  return false;
}
function addWarnings(k,n,reason='',options={}){
  if(!originalBooleanGate('Can_Warn',k,options.card||null,{'#warnings':n}))return false;
  n=Math.max(0,Number(n)||0);
  if(!n)return false;
  const blocked=warningsDisabled();
  if(blocked.disabled){
    addLog(`${blocked.reason} ${n} Warning${n===1?'':'s'}${reason?' from '+reason:''} are not added.`);
    return false;
  }
  const s=side(k);
  let total=n;
  if(!options.skipGoodOfficiating){
    const extra=goodOfficiatingExtraWarnings(k);
    if(extra){
      total+=extra;
      addLog(`Good Officiating! adds 4 more Warnings the first time ${s.name} receives Warnings this turn.`);
    }
  }
  s.warnings=(s.warnings||0)+total;
  addLog(`${s.name} receives ${total} Warning${total===1?'':'s'}${reason?' from '+reason:''}. Total: ${s.warnings}.`);
  if(runDisqualificationCheck(k))return true;
  if(s.superKey==='shane'){
    s.hp=Math.min(s.maxHp,s.hp+2);
    side(other(k)).shanePinPenalty=(side(other(k)).shanePinPenalty||0)+2;
    addLog(`${s.name} heals 2 HP after receiving a Warning.`);
  }
  if(side(other(k)).superKey==='flair'){
    gainMomentum(other(k),'Attitude',3);
    addLog(`${side(other(k)).name} gains 3 Attitude because the opponent received a Warning.`);
  }
  return false;
}
function warningValue(card){
  const t=String(card?.description||'');
  const m=t.match(/(?:get|receive|receives)\s+(?:up to\s+)?(\d+)\s+Warnings?/i);
  return m?Number(m[1]):0;
}
function applyEndTurnRefereeEffects(k){
  if(!state||state.ended)return false;
  const s=side(k);
  const nick=refereeSpecialsInPlay().some(r=>/Nick Patrick/i.test(r.name));
  if(nick&&(s.warnings||0)>5){
    addLog(`Referee Nick Patrick gives ${s.name} 10 more Warnings for ending the turn with more than 5.`);
    return addWarnings(k,10,'Referee Nick Patrick',{skipGoodOfficiating:true});
  }
  return false;
}
function originalScriptForms(card,event){return ORIGINAL_SCRIPT_ASTS?.[String(card?.sourceFile||'')]?.[event]||null}
function originalScriptFor(card,event){return String(card?.originalScripts?.[event]||'')}
function liveSideKey(obj){return obj===state?.player?'player':obj===state?.cpu?'cpu':null}
function originalPageCatalog(){const map=new Map();for(const page of cards){for(const key of [page.id,page.unid,page.baseUNID,page.originalUNID,page.sourceFile])if(key!=null)map.set(String(key),page)}return map}
function runOriginalCardEvent(event,k,c,extraEnv={}){
  const forms=originalScriptForms(c,event);if(!forms)return {hadScript:false,executed:false,trace:[]};
  if(typeof WAInterpreter!=='function'||typeof WAGameStateAdapter!=='function')throw new Error('Original script runtime is unavailable.');
  const actor=side(k),target=side(other(k));
  const adapter=new WAGameStateAdapter(state,{
    actor,target,thisPage:c,pageCatalog:originalPageCatalog(),
    log:text=>addLog(`${c.name}: ${text}`),
    hooks:{
      canPlayPage:({who,page})=>!legalReason(page,liveSideKey(who)||k,true),
      warning:()=>undefined,
      damage:()=>undefined,
      pin:payload=>{state.pinScriptRequest=payload;addLog(`${c.name} requests the original pin routine.`);return true},
      autocounter:({who})=>{addLog(`${who?.name||'A Superstar'} triggers an original-script Autocounter.`);return true},
      forcePage:payload=>{state.forcedPageRequest=payload;return null},
      forceMove:payload=>{state.forcedMoveRequest=payload;return null},
      playSound:()=>true,stopSound:()=>true
    }
  });
  const engine=adapter.asFunctions();
  // Route shared global mechanics through the live engine instead of duplicating them.
  engine.WAWarn=(who,n=1)=>{const key=liveSideKey(adapter.side(who));return addWarnings(key,Number(n)||1,c.name)};
  engine.WADrawPage=(who,n=1)=>{const key=liveSideKey(adapter.side(who));const before=side(key).hand.length;drawPages(key,Number(n)||1);return side(key).hand.slice(before)};
  engine.WAChangeControl=who=>{const key=liveSideKey(adapter.side(who));if(key){side(key).lastControlTurn=state.round||0;return changeControlCertified(key,`from ${c.name}`)}return false};
  engine.WAMove=(who,location)=>{const key=liveSideKey(adapter.side(who));if(!key)return false;const resolved=String(adapter.WAFindLocation(location)||location).replace(/^\$/,'');return setMatchLocation(key,resolved,{reason:c.name});};
  engine.WAMessage=(...args)=>{const parts=args.filter((x,i)=>!(i===0&&Number(x)===-1)).map(x=>typeof x==='object'?(x?.name||x?.title||String(x)):String(x??'')).filter(Boolean);const text=parts.join(' ').replace(/\s+/g,' ').trim();if(text)addLog(text);return text};
  engine.WAMessageFromPage=page=>{const text=String(page?.description||page?.name||'');addLog(`${c.name}: ${text}`);return text};
  const interpreter=new WAInterpreter(engine,{maxSteps:250000});
  const env={'#superstar':actor,'#target':target,'#initiator':actor,'#opponent':target,'#this':c,'#move':c,'#page':c,'#counter':c,...extraEnv};
  try{
    const result=interpreter.run(forms,env);
    state.originalScriptTrace=state.originalScriptTrace||[];
    state.originalScriptTrace.push({round:state.round,event,sourceFile:c.sourceFile,card:c.name,steps:result.steps,trace:result.trace});
    if(state.originalScriptTrace.length>500)state.originalScriptTrace.splice(0,state.originalScriptTrace.length-500);
    return {hadScript:true,executed:true,...result};
  }catch(error){
    const detail=`${c.name} ${event} script failed: ${error.message}`;
    addLog(detail);state.scriptRuntimeFailure={event,sourceFile:c.sourceFile,card:c.name,error:error.message};state.busy=false;render();
    return {hadScript:true,executed:false,error,trace:interpreter.trace||[]};
  }
}
function executeCertifiedOriginalEffects(event,k,c,extraEnv={}){return runOriginalCardEvent(event,k,c,extraEnv)}
function originalEventParticipants(k,event,primary=null){
  const seen=new Set(),pages=[];
  const add=p=>{if(!p||!originalScriptForms(p,event))return;const key=String(p.sourceFile||p.id||p.name);if(seen.has(key))return;seen.add(key);pages.push(p)};
  add(primary);
  for(const who of [k,other(k)]){
    const s=side(who);
    for(const entry of s.inPlay||[])add(entry.card||entry);
    const star=cards.find(p=>p.cardClass==='Superstar'&&String(p.sourceFile||'')===String((SUPERSTARS[s.rosterKey]||{}).sourceFile||''));add(star);
  }
  return pages;
}
function dispatchOriginalEvent(event,k,primary=null,extraEnv={}){
  const results=[];
  for(const page of originalEventParticipants(k,event,primary))results.push({page,result:runOriginalCardEvent(event,k,page,{...extraEnv,'#page':primary||page,'#move':extraEnv['#move']||primary||page})});
  return results;
}
function originalBooleanGate(event,k,card,extraEnv={}){
  const own=runOriginalCardEvent(event,k,card,extraEnv);if(own.hadScript&&own.executed&&own.result===false)return false;
  for(const row of dispatchOriginalEvent(event,k,null,{...extraEnv,'#page':card,'#move':extraEnv['#move']||card}))if(row.result?.executed&&row.result.result===false)return false;
  return true;
}
function changeControlCertified(k,reason=''){
  if(!state||state.ended||!k)return false;const prior=state.control;state.control=k;
  if(prior!==k){dispatchOriginalEvent('Control_Changed',k,null,{'#old_control':prior,'#new_control':side(k)});if(reason)addLog(`${side(k).name} gains control${reason?' '+reason:''}.`)}
  return true;
}
function canonicalCountName(card){const t=String(card?.description||'');const m=t.match(/\(Counts as\s+["“]?([^\)"”]+)["”]?\.?\)/i);return (m?m[1]:card?.name||'').trim().toLowerCase()}
function pinHealthBracket(target){
  const maxHp=Math.max(1,Number(target.maxHp)||1);
  const percent=Math.round((Math.max(0,Number(target.hp)||0)/maxHp)*100);
  if(percent>85)return 5;
  if(percent>=50)return 4;
  if(percent>=25)return 3;
  if(percent>=10)return 2;
  if(percent>=1)return 1;
  return 0;
}
function recoveredPinScore(k){
  const attacker=side(k),defender=side(other(k));
  const remainingPinningMomentum=totalMomentum(attacker);
  const defenderMomentum=totalMomentum(defender);
  const healthBracket=pinHealthBracket(defender);
  const healthScore=(5-healthBracket)*20;
  const momentumScore=(remainingPinningMomentum-defenderMomentum)*2;
  const finisherBonus=state.lastFinisher&&state.lastFinisher.by===k?20:0;
  let score=momentumScore+healthScore+finisherBonus;

  state.pinScore=score;
  state.pinningMomentum=remainingPinningMomentum;
  attacker.pinMomentum=remainingPinningMomentum;
  defender.pinMomentum=remainingPinningMomentum;

  // The original executable stores PinScore, fires Affect_Pin_Score, then reads it back.
  dispatchOriginalEvent('Affect_Pin_Score',k,null,{
    '#target':defender,
    '#initiator':attacker,
    '#pinscore':score
  });
  score=Number(state.pinScore);
  if(!Number.isFinite(score))score=0;

  // Preserve already-imported explicit script modifiers while avoiding old guessed constants.
  score+=Number(attacker.affectPinScore||0);
  score+=Number(defender.affectPinScore||0);
  score-=Number(defender.shanePinPenalty||0);

  return {
    certified:true,
    score:Math.trunc(score),
    chance:Math.max(0,Math.min(1,score/100)),
    remainingPinningMomentum,
    defenderMomentum,
    healthBracket,
    healthScore,
    momentumScore,
    finisherBonus
  };
}
function pinScoreBreakdown(k){return recoveredPinScore(k)}
function pinChance(k){return pinScoreBreakdown(k).chance}
function pinReactionCards(k){
  const s=side(k);
  return s.hand.filter(card=>{
    const f=String(card.sourceFile||'');
    if(/^GetAShoulderUp\.gac$/i.test(f)){
      return ((s.momentum.Agility||0)>=4||(s.momentum.Strength||0)>=4)&&
        s.alignment!=='Heel'&&(s.playedGASU||0)<2;
    }
    if(/^(?:GrabTheRope|GrabTheRopes2E)\.gac$/i.test(f)){
      return atLocation(k,'InTheRing')&&!refereeDistracted();
    }
    if(/^(?:HeyRefThatWasThree|ThatWasThree2E)\.gac$/i.test(f)){
      return !refereeDistracted()&&s.alignment!=='Heel'&&
        Number(originalGameMapValue('PlayedThatWasThree'))!==1&&
        Number(originalGameMapValue('EventsPlayed'))<3;
    }
    return false;
  });
}
function resolvePinReaction(defenderKey,card,pinnerKey){
  const defender=side(defenderKey),pinner=side(pinnerKey),f=String(card.sourceFile||'');
  removeCard(defenderKey,card);
  payCardCost(defenderKey,card);
  state.pile={card,owner:defenderKey,status:'PIN SPECIAL'};
  state.pinPending=null;
  defender.pinned=false;

  if(/^GetAShoulderUp\.gac$/i.test(f)){
    defender.playedGASU=(defender.playedGASU||0)+1;
    changeControlCertified(defenderKey,'after Get a Shoulder Up');
    state.position='Standing';
    addLog(`${defender.name} plays ${card.name}. The pin fails and ${defender.name} gains control.`);
    return {broken:true,gainsControl:true};
  }
  if(/^(?:HeyRefThatWasThree|ThatWasThree2E)\.gac$/i.test(f)){
    state.gameMap.waValues=state.gameMap.waValues||{};
    state.gameMap.waValues.PlayedThatWasThree=1;
    state.gameMap.waValues.EventsPlayed=Number(state.gameMap.waValues.EventsPlayed||0)+1;
    changeControlCertified(defenderKey,'after That Was Three!');
    state.position='Standing';
    addLog(`${defender.name} plays ${card.name}. The pin fails and ${defender.name} gains control.`);
    return {broken:true,gainsControl:true};
  }
  if(/^(?:GrabTheRope|GrabTheRopes2E)\.gac$/i.test(f)){
    drawPages(defenderKey,1);
    pinner.pinLockedUntilMove=true;
    state.control=pinnerKey;
    addLog(`${defender.name} plays ${card.name}, draws one page, and stops the pin. ${pinner.name} remains in control but cannot pin again until another Move is played.`);
    return {broken:true,gainsControl:false};
  }
  return {broken:false,gainsControl:false};
}
function offerPinReaction(defenderKey,pinnerKey){
  const options=pinReactionCards(defenderKey);
  if(!options.length)return null;
  let card=null;
  if(defenderKey==='cpu')card=options[0];
  else{
    const menu=options.map((c,i)=>`${i+1}. ${c.name}`).join('\n');
    const choice=Number(prompt(`Choose a Special to stop the pin, or Cancel to Pass:\n${menu}`,'1'));
    if(Number.isInteger(choice)&&choice>=1&&choice<=options.length)card=options[choice-1];
  }
  return card?resolvePinReaction(defenderKey,card,pinnerKey):null;
}
function applySourcePinModifiers(k,c){const a=side(k),d=side(other(k)),scripts=c.originalScripts||{},move=String(scripts.Move_Connected||''),page=String(scripts.Page_Played||'');if(move&&!/\(eq #move #this\)/.test(move)&&!/WAInPlay #this/.test(move))return;const add=[...move.matchAll(/#superstar\s+AffectPinScore\s+\(add\s+(\d+)/g)];for(const m of add){a.affectPinScore=(a.affectPinScore||0)+Number(m[1]);addLog(`${c.name} adds ${m[1]} to ${a.name}'s pin score.`)}const sub=[...move.matchAll(/#target\s+AffectPinScore\s+\(subtract[^\d]*(\d+)/g)];for(const m of sub){d.affectPinScore=(d.affectPinScore||0)-Number(m[1]);addLog(`${c.name} applies -${m[1]} to ${d.name}'s pin score.`)}if(/OffTheBarricade\.gac/i.test(String(c.sourceFile||''))){d.affectPinScore=(d.affectPinScore||0)-7;addLog(`${c.name} applies its permanent -7 pin-score modifier.`)}}
function verifiedSpecialLegal(card,key,asCounter=false){
 const s=side(key),d=side(other(key)),f=String(card.sourceFile||'');
 if(/^Boring\.gac$/i.test(f)){if(state.control===key)return'Play only while not in control.';if(!state.lastMove||!state.lastConnectedMove||state.lastMove.moveType!==state.lastConnectedMove.moveType)return"Opponent's move and last connected move must have the same move type.";return''}
 if(/^Break2E\.gac$/i.test(f)){if(s.hitStreak<2)return'Needs two connected moves in a row.';if(s.playedMoveThisTurn)return'Play before a move this turn.';return''}
 if(/^BreakEX2\.gac$/i.test(f)){if(state.control===key)return'Play only while not in control.';if((d.momentum.Attitude||0)<(s.momentum.Attitude||0)+3)return'Opponent needs at least 3 more Attitude.';if(state.round>=30)return'Playable only before turn 30.';return''}
 if(/^HookTheLeg(?:2E|EX2)?\.gac$/i.test(f)){if(state.control!==key)return'Play only while in control.';if(!['Grounded','Prone','Victim Below'].includes(state.position))return'Opponent must be on the mat.';return''}
 if(/^(CatchHimStunned)\.gac$/i.test(f)){if(state.control!==key)return'Play only while in control.';if(!isCurrentlyStunned(other(key)))return'Opponent must be Stunned.';return''}
 if(/^(GetAShoulderUp|HeyRefThatWasThree)\.gac$/i.test(f))return'Play only as a pin reaction.';
 if(/^NipUp\.gac$/i.test(f)){
   if(state.control===key||!['Grounded','Prone','Victim Below'].includes(state.position))return'Play only while you are on the mat and not in control.';
   const star=currentStar(key),noAgility=Number(star?.momentumMaximums?.Agility)===-1;
   if(!['rock','brock'].includes(s.superKey)&&!noAgility)return'Only The Rock, Brock Lesnar, or a Superstar with no Agility limit may play Kip Up.';
   return '';
 }
 if(/^HighSpot\.gac$/i.test(f)&&!['Grounded','Prone','Victim Below'].includes(state.position))return'Opponent must be on the mat.';
 if(/^GoingUpTop\.gac$/i.test(f)&&s.hitStreak<2)return'Needs two connected moves in a row.';
 if(/^BuildingMomentum\.gac$/i.test(f)&&(s.momentum.Attitude||0)<1)return'Needs at least 1 Attitude.';
 return null
}
function isMovePage(card){
  if(!card)return false;
  return ['Move','Submission','Trademark'].includes(String(card.cardClass||'')) ||
    ['Strike','Grapple','Aerial','Submission'].includes(String(card.type||''));
}
function modifierText(card){const m=card?.modifiers;return Array.isArray(m)?m.join(' '):String(m||'')}
function isEntrancePage(card){return /\bEntrance\b/i.test(`${modifierText(card)} ${card?.description||''}`)}
function isDamageSpecial(card){return card?.cardClass==='Special'&&/\bDamage\b/i.test(modifierText(card))}
function isReactiveOnlyPage(card){return /^(?:GrabTheRope|GrabTheRopes2E|BackToTheWellOnceToOften|OnceTooOften2E)\.gac$/i.test(String(card?.sourceFile||''))}
function isOpeningEntranceWindow(){return Number(state?.round||0)<=2}
function damageSpecialMoveReason(special,move,key){
 if(!isMovePage(move)||modifierText(move).toLowerCase().includes('defensive'))return 'Choose a non-defensive Move.';
 const normal=legalReason(move,key,false,true);if(normal)return normal;
 const f=String(special?.sourceFile||'');
 if(/^StunningBlow(?:2E)?\.gac$/i.test(f)){
   if(move.finisher)return 'Stunning Blow cannot be played with a Finisher.';
   if(!/\bImpact\b/i.test(modifierText(move)))return 'Stunning Blow must be played with an Impact move.';
 }
 return '';
}
function hasEligibleAttachedMove(key,special=null){return side(key).hand.some(c=>!damageSpecialMoveReason(special,c,key))}
function legalReason(card,key,asCounter=false,skipAttachedCheck=false){const s=side(key),sourceFile=String(card?.sourceFile||'');const useOriginalPlayGate=card?.cardClass!=='Momentum'&&!/^NipUp\.gac$/i.test(sourceFile);if(useOriginalPlayGate&&!originalBooleanGate('Can_Be_Played',key,card,{'#countering':!!asCounter}))return'Original card script says this page cannot be played now.';if(s.superKey==='brock'&&/Amazing Entrance/i.test(card.name||''))return 'Brock Lesnar may not play Amazing Entrance.';const verified=verifiedSpecialLegal(card,key,asCounter);if(verified!==null&&verified)return verified;if((state.busy||state.awaitingCpuMoveAck||state.awaitingAutoCounterAck)&&!asCounter)return'Finish the current resolution first.';if(isEntrancePage(card)&&!isOpeningEntranceWindow())return'Entrances may only be played on turn one or two.';if(isReactiveOnlyPage(card)&&!asCounter)return'Reactive page — playable only in its counter window.';if(isDamageSpecial(card)&&!asCounter&&!skipAttachedCheck){if(state.control!==key)return'Play only while in control.';if(!hasEligibleAttachedMove(key,card))return'Must be played with a legal compatible Move.';}if(state.control!==key&&!asCounter&&!/^(Boring|BreakEX2|NipUp)\.gac$/i.test(String(card.sourceFile||'')))return'No match control.';if(state.hold)return'A submission is active.';if(isMovePage(card)&&/hold/i.test(`${modifierText(card)} ${card.description||''}`)&&state.round===4&&side(other(key)).inPlay.some(e=>/^JustBringItEX2\.gac$/i.test(String(e.sourceFile||''))))return'Just Bring It! prevents Holds on turn 4.';syncStunState(key);if(isCurrentlyStunned(key)&&!canPlayWhileStunned(card))return`${s.name} is Stunned.`;if(/^SuperMomentum(?:LE)?\.gac$/i.test(String(card.sourceFile||''))&&s.superKey!=='hurricane')return'Hurricane Trademark only.';if(card.cardClass==='Momentum'&&s.superKey==='brock'&&(s.momentumPagesPlayed||0)>=3)return'Brock Lesnar may play only 3 Momentum pages.';if(card.cardClass==='Momentum'){const gains=card.momentumChanges?.gain||{[card.momentumType]:card.momentumAmount||1};const useful=Object.entries(gains).some(([t,n])=>Number(n)>0&&momentumGainRoom(key,t)>0);if(!useful)return'Original Superstar momentum maximum reached.';}if(card.cardClass==='Momentum'&&s.momentumPlayedSinceSuccess)return'You must connect with a move before playing another Momentum page.';if(s.momentumPlayedSinceSuccess&&!asCounter&&!isMovePage(card))return'After playing Momentum, your next page must be a Move Page.';const cost=actualCost(card,key);if(cost>totalMomentum(s))return`Needs ${cost} total momentum (you have ${totalMomentum(s)}).`;if(card.minTurn&&state.round<card.minTurn)return`Playable after turn ${card.minTurn-1}.`;if(card.workingStiff&&s.inPlay.some(e=>e.workingStiff))return'Only one Working Stiff may be in play.';if(card.supportPage&&s.inPlay.some(e=>e.supportPage))return'Only one Support page may be in play.';const mods=String(card.modifiers||'').toLowerCase();if(mods.includes('event')){if(s.eventNamesPlayed.includes(card.name))return'Each Event may only be played once per match.';if(s.eventsPlayed>=3)return'Only three Event pages may be played per match.';}if(mods.includes('referee')&&['player','cpu'].some(x=>side(x).inPlay.some(e=>String(e.modifiers||e.card?.modifiers||'').toLowerCase().includes('referee'))))return'Only one Referee Special may be in play.';if(card.onlyOneInPlay&&s.inPlay.some(e=>e.sourceFile===card.sourceFile||e.name===card.name))return`Only one ${card.name} may be in play.`;if(card.requiresInPlay){const needle=card.requiresInPlay.toLowerCase();const present=[...s.inPlay,...side(other(key)).inPlay].some(e=>String(e.name||'').toLowerCase().includes(needle));if(!present)return`Requires ${card.requiresInPlay} in play.`;}if(card.gotAllOfIt&&!s.hand.some(x=>isMovePage(x)&&!String(x.modifiers||'').toLowerCase().includes('defensive')))return'Got All Of It! must be played with a non-defensive move.';if(card.latinoHeat&&((s.momentum.Knowledge||0)>0||s.latinoHeatUses>=3))return (s.momentum.Knowledge||0)>0?'Latino Heat requires no Knowledge Momentum.':'Latino Heat may only be played three times per match.';if(card.callingForIt&&s.hitStreak<3)return'Needs three connected moves in a row.';if(s.pendingCallingForIt&&isMovePage(card)&&s.connectedMoves.includes(card.name))return"He's Calling For It requires a move not yet connected this match.";for(const [type,need] of Object.entries(card.playMomentumRequirements||card.momentumRequirements||{})){if((s.momentum[type]||0)<need)return`Needs ${need} ${type} momentum.`;}if(card.counterOnly&&!asCounter)return'Counter only.';if(other&&false){}if((/Plead to the Referee|Good Officiating/i.test(card.name))&&side(other(key)).superKey==='christian'&&(side(other(key)).warnings||0)===0)return`Christian has no Warnings.`;if(card.face&&s.alignment==='Heel')return'Face page conflicts with Heel.';if(card.heel&&s.alignment==='Face')return'Heel page conflicts with Face.';if(card.requirement&&!s.methods[card.requirement])return`Needs ${card.requirement}.`;if(!asCounter){
  const txt=String(card.description||'').toLowerCase();
  if((txt.includes('only if your opponent is on the mat')||txt.includes('only if opponent is on the mat'))&&!['Grounded','Prone','Victim Below'].includes(state.position))return'Opponent must be on the mat.';
  if(txt.includes('only if your opponent is standing')&&state.position!=='Standing')return'Opponent must be standing.';
  if((txt.includes('only if both you and your opponent are at ringside')||txt.includes('only while both you and your opponent are at ringside'))&&(!atLocation(key,'Ringside')||!atLocation(other(key),'Ringside')))return'Both Superstars must be at Ringside.';
  if((txt.includes('only if you are at ringside')||txt.includes('only while you are at ringside'))&&!atLocation(key,'Ringside'))return`${s.name} must be at Ringside.`;
  if((txt.includes('only if your opponent is at ringside')||txt.includes('only while your opponent is at ringside'))&&!atLocation(other(key),'Ringside'))return`${side(other(key)).name} must be at Ringside.`;
  if((txt.includes('only if both you and your opponent are in the ring')||txt.includes('only while both you and your opponent are in the ring'))&&(!atLocation(key,'InTheRing')||!atLocation(other(key),'InTheRing')))return'Both Superstars must be in the ring.';
}return''}
const isLegal=(c,k)=>!legalReason(c,k);
function removeCard(k,c){const s=side(k),i=s.hand.findIndex(x=>x.instance===c.instance);if(i>=0)s.hand.splice(i,1);s.discard.push(c)}
function addLog(t){state.traceSeq=(state.traceSeq||0)+1;state.log.unshift(`[${state.traceSeq}] ${t}`);state.log=state.log.slice(0,250)}
function counterOptions(k,attack){
  if(!attack||attack.uncounterable)return [];
  const s=side(k);
  const positions=[attack.position,attack.originalMoveType,attack.setsPosition]
    .filter(Boolean).map(x=>String(x).trim().toLowerCase());
  return s.hand.filter(c=>
    isMovePage(c)&&
    !legalReason(c,k,true)&&
    Array.isArray(c.counters)&&
    c.counters.some(x=>positions.includes(String(x).trim().toLowerCase()))
  ).sort((a,b)=>scoreCard(b,k)-scoreCard(a,k));
}
function chooseCounter(k,attack){
  const options=counterOptions(k,attack);
  if(!options.length)return null;
  if(k==='cpu')return options[0];
  if(options.length===1)return options[0];
  const menu=options.map((c,i)=>`${i+1}. ${c.name} · Cost ${actualCost(c,k)} · Damage ${Number(c.damage)||0}`).join('\n');
  const choice=Number(prompt(`Choose a Move Page to counter ${attack.name}, or Cancel to consider Autocounter:\n${menu}`,'1'));
  return Number.isInteger(choice)&&choice>=1&&choice<=options.length?options[choice-1]:null;
}
function findCounter(k,attack){return chooseCounter(k,attack)}
function play(i){if(!state||state.busy||!claimMatchAction('play-card',1100))return;const c=state.player.hand[i];if(!c)return;const reason=legalReason(c,'player');if(reason){releaseMatchAction('play-card');state.message=reason;render();return}resolveCard('player',c)}
function resolveCard(k,c){if(!state||state.ended)return;if(c.cardClass==='Momentum')return resolveMomentum(k,c);if(c.latinoHeat)return resolveLatinoHeat(k,c);if(c.cardClass==='Gameplan'||c.cardClass==='Special')return resolveGameplan(k,c);resolveAttack(k,c)}
function resolveLatinoHeat(k,c){state.busy=true;const s=side(k);removeCard(k,c);s.latinoHeatUses++;const n=new Set(s.hitStreakMethods||[]).size;drawPages(k,n);state.pile={card:c,owner:k,status:'TRADEMARK'};state.message=`${s.name} plays Latino Heat and draws ${n} page${n===1?'':'s'}.`;addLog(state.message);state.busy=false;render();if(k==='cpu')scheduleCpuTurn(400)}
function resolveMomentum(k,c){playSfx('GameButtonSound',.55);state.busy=true;const s=side(k);if(s.superKey==='brock'&&(s.momentumPagesPlayed||0)>=3){state.busy=false;state.message='Brock Lesnar may play only 3 Momentum pages.';render();return}removeCard(k,c);s.momentumPagesPlayed=(s.momentumPagesPlayed||0)+1;s.momentumPlayedSinceSuccess=true;if(c.momentumChanges){for(const [type,n] of Object.entries(c.momentumChanges.gain||{}))gainMomentum(k,type,n);for(const [type,n] of Object.entries(c.momentumChanges.lose||{}))s.momentum[type]=Math.max(0,(s.momentum[type]||0)-n)}else gainMomentum(k,c.momentumType,c.momentumAmount||1);if(s.superKey==='scotthall'){const mt=c.momentumType||Object.keys(c.momentumChanges?.gain||{})[0];if(mt==='Strike'&&s.scottHallStrikeUses<2){const pool=s.deck.filter(x=>x.heel);if(pool.length){const x=pool[Math.floor(Math.random()*pool.length)];s.deck.splice(s.deck.indexOf(x),1);s.hand.push(x);s.scottHallStrikeUses++;addLog(`${s.name} draws ${x.name} from his Strike Momentum ability.`)}}if(mt==='Strength'&&s.scottHallStrengthUses<2){const pool=s.deck.filter(x=>x.cardClass==='Special'&&/damage/i.test(String(x.modifiers||x.description||'')));if(pool.length){const x=pool[Math.floor(Math.random()*pool.length)];s.deck.splice(s.deck.indexOf(x),1);s.hand.push(x);s.scottHallStrengthUses++;addLog(`${s.name} draws ${x.name} from his Strength Momentum ability.`)}}}if(/^SuperMomentum(?:LE)?\.gac$/i.test(String(c.sourceFile||''))){const heat=cards.find(x=>x.sourceFile==='Heat.gac');if(heat){side(other(k)).hand.push({...heat,instance:`${heat.id}_${Date.now()}_${Math.random()}`});addLog(`Heat is put into ${side(other(k)).name}'s hand.`)}}state.pile={card:c,owner:k,status:'MOMENTUM'};state.message=`${s.name} plays ${c.name} and applies its original momentum changes.`;addLog(state.message);state.busy=false;render();if(k==='cpu')scheduleCpuTurn(250)}
function randomDitch(k,pred,n=1){const s=side(k);for(let z=0;z<n;z++){const pool=s.hand.filter(pred);if(!pool.length)break;const c=pool[Math.floor(Math.random()*pool.length)];s.hand.splice(s.hand.indexOf(c),1);s.discard.push(c);addLog(`${s.name} ditches ${c.name}.`)}}
function verifiedSpecialResolve(k,c){const s=side(k),d=side(other(k)),f=String(c.sourceFile||'');
 const done=(status='RESOLVED')=>{state.pile={card:c,owner:k,status};state.busy=false;render();if(k==='cpu')scheduleCpuTurn(350)};
 const healExact=(who,amount,label)=>{const target=side(who),before=target.hp;target.hp=Math.min(target.maxHp,target.hp+Math.max(0,Number(amount)||0));const healed=target.hp-before;addLog(`${label} heals ${target.name} for ${healed} HP.`);return healed};
 if(/^TakeABreather\.gac$/i.test(f)){
   removeCard(k,c);payCardCost(k,c);
   drawPages(other(k),1);
   const healAmount=3+Math.min(10,Math.max(0,Number(s.momentum.Strength)||0));
   healExact(k,healAmount,c.name);
   state.message=`${s.name} plays ${c.name}, the opponent draws one page, and ${s.name} heals up to ${healAmount} HP.`;
   done('RESOLVED');return true;
 }
 if(/^HookTheLeg2E\.gac$/i.test(f)){removeCard(k,c);drawPages(k,1);state.moveStringBroken=true;state.pinBonus=0;state.busy=false;attemptPin(k);return true}
 if(/^HookTheLegEX2\.gac$/i.test(f)){removeCard(k,c);state.pinBonus=s.pins>d.pins?.15:0;state.busy=false;attemptPin(k);return true}
 if(/^HookTheLeg\.gac$/i.test(f)){removeCard(k,c);drawPages(k,1);state.moveStringBroken=true;state.busy=false;attemptPin(k);return true}
 if(/^Taunt2E\.gac$/i.test(f)){removeCard(k,c);drawPages(k,1);d.momentum.Attitude=Math.max(0,(d.momentum.Attitude||0)-1);s.buffs.nextDamage=(s.buffs.nextDamage||0)+2;if(c.heel)s.alignment='Heel';done('NEXT MOVE +2');return true}
 if(/^Taunt\.gac$/i.test(f)){removeCard(k,c);drawPages(k,1);randomMomentumLoss(other(k),1);s.buffs.nextDamage=(s.buffs.nextDamage||0)+2;if(c.heel)s.alignment='Heel';done('NEXT MOVE +2');return true}
 if(/^Boring\.gac$/i.test(f)){removeCard(k,c);drawPages(k,3);state.control=k;beginTurn(k);done('REACTION');return true}
 if(/^Break2E\.gac$/i.test(f)){removeCard(k,c);gainMomentum(k,'Attitude',1);drawPages(k,2);state.control=other(k);beginTurn(state.control);done('BREAK');return true}
 if(/^BreakEX2\.gac$/i.test(f)){removeCard(k,c);d.momentum.Attitude=Math.max(0,(d.momentum.Attitude||0)-5);randomDitch(other(k),x=>isMovePage(x),1);state.control=k;beginTurn(k);done('BREAK');return true}
 if(/^BounceOffTheRopes(?:2E)?\.gac$/i.test(f)){removeCard(k,c);const finish=()=>{s.inPlay.push({name:c.name,sourceFile:c.sourceFile,card:c,cardClass:c.cardClass,duration:999,bounceOffRopes:true,removeAfterTrigger:true});done('IN PLAY')};if((s.momentum.Strike||0)>=3){if(!searchDeckChoice(k,x=>isMovePage(x)&&x.method==='Strike','Choose a Strike move',finish))finish()}else finish();return true}
 if(/^AlwaysThinking(?:2E)?\.gac$/i.test(f)){removeCard(k,c);drawPages(k,1);s.alwaysThinking=(s.alwaysThinking||0)+1;s.inPlay.push({name:c.name,sourceFile:c.sourceFile,card:c,cardClass:c.cardClass,duration:999,alwaysThinking:true,removeWhenStunned:true});if(s.deck[0])addLog(`${s.name}'s next page is ${s.deck[0].name}.`);done('IN PLAY');return true}
 if(/^Disadvantage2E\.gac$/i.test(f)){removeCard(k,c);const dmg=d.inPlay.filter(x=>x.cardClass==='Special'&&/damage/i.test(String(x.description||x.card?.description||'')));if(dmg.length){d.inPlay=d.inPlay.filter(x=>!dmg.includes(x));d.discard.push(...dmg.map(x=>x.card||x));}else{drawPages(k,1);s.buffs.damageShield=Math.max(s.buffs.damageShield,2)}done('REACTION');return true}
 if(/^IGotYourBack2E\.gac$/i.test(f)){removeCard(k,c);const finish=()=>{const rem=d.inPlay.filter(x=>x.supportPage);d.inPlay=d.inPlay.filter(x=>!x.supportPage);d.discard.push(...rem.map(x=>x.card||x));done('SEARCH')};if(!searchDeckChoice(k,x=>x.cardClass==='Special'&&/support/i.test(String(x.modifiers||x.description||'')),'Choose a Support',finish))finish();return true}
 if(/^GoingUpTop\.gac$/i.test(f)){removeCard(k,c);drawPages(k,1);s.nextMoveFlags.goingUpTop=true;done('WITH NEXT MOVE');return true}
 if(/^BuildingMomentum\.gac$/i.test(f)){removeCard(k,c);const max=Math.min(3,s.momentum.Attitude||0,s.deck.filter(x=>x.cardClass==='Momentum').length);if(max<1){done('NO TARGET');return true}const counts=Array.from({length:max},(_,i)=>({name:String(i+1),cardClass:'Choice',momentumCost:0,count:i+1}));openChoiceOverlay(k,`Choose how many Momentum pages (1-${max})`,counts,opt=>{const n=opt.count;searchMultipleDeckChoice(k,x=>x.cardClass==='Momentum','Choose a Momentum page',n,picks=>{s.momentum.Attitude=Math.max(0,s.momentum.Attitude-picks.length);done('SEARCH')})},{required:true,source:'number'});return true}
 if(/^HighSpot\.gac$/i.test(f)){removeCard(k,c);const finish=()=>{s.nextMoveFlags.highSpot=true;done('SEARCH')};if(!searchDeckChoice(k,x=>isMovePage(x)&&(Number(x.momentumCost)||0)>=6,'Choose a move costing 6 or more',finish))finish();return true}
 if(/^AdvantageTechnical\.gac$/i.test(f)){removeCard(k,c);s.inPlay.push({name:c.name,sourceFile:c.sourceFile,card:c,cardClass:c.cardClass,duration:999,advantageImpact:true});done('IN PLAY');return true}
 if(/^AchillesHeel2E\.gac$/i.test(f)){removeCard(k,c);s.inPlay.push({name:c.name,sourceFile:c.sourceFile,card:c,cardClass:c.cardClass,duration:999,achillesHeel:true,removeWhenStunned:true});done('IN PLAY');return true}
 if(/^EverythingHurts\.gac$/i.test(f)){removeCard(k,c);s.inPlay.push({name:c.name,sourceFile:c.sourceFile,card:c,cardClass:c.cardClass,duration:999,everythingHurts:true});done('IN PLAY');return true}
 if(/^Big(?:a|A)ndNasty(?:EX1|2E)\.gac$/i.test(f)){removeCard(k,c);s.inPlay.push({name:c.name,sourceFile:c.sourceFile,card:c,cardClass:c.cardClass,duration:999,bigAndNasty:true,onlyOneInPlay:true});done('IN PLAY');return true}
 if(/^HardcoreEX3\.gac$/i.test(f)){removeCard(k,c);s.inPlay.push({name:c.name,sourceFile:c.sourceFile,card:c,cardClass:c.cardClass,duration:5,hardcore:true});done('IN PLAY');return true}
 if(/^CatchHimStunned\.gac$/i.test(f)){removeCard(k,c);randomDitch(other(k),()=>true,3);state.busy=false;attemptPin(k);return true}
 if(/^Hello\.gac$/i.test(f)){removeCard(k,c);const finish=()=>{gainMomentum(k,'Attitude',1);done('SEARCH')};if(!searchDeckChoice(k,x=>x.cardClass==='Special','Choose a Special',finish))finish();return true}
 if(/^DVon(?:EX2)?\.gac$/i.test(f)||/^BubbaRay\.gac$/i.test(f)){removeCard(k,c);s.inPlay.push({name:c.name,sourceFile:c.sourceFile,card:c,cardClass:c.cardClass,duration:999,dudleyPartner:true});done('IN PLAY');return true}
 if(/^NipUp\.gac$/i.test(f)){
   removeCard(k,c);payCardCost(k,c);
   const finish=pick=>{if(pick)s.kipUpPendingInstance=pick.instance;done('SEARCH')};
   if(k==='cpu'){
     const pool=s.deck.filter(x=>isMovePage(x));const pick=[...pool].sort((a,b)=>scoreCard(b,k)-scoreCard(a,k))[0];
     if(pick){s.deck.splice(s.deck.indexOf(pick),1);s.hand.push(pick);finish(pick)}else finish(null);
   }else searchDeckChoice(k,x=>isMovePage(x),'Kip Up — choose a Move to play this turn',finish,true);
   return true;
 }
 return false}
function resolveGameplan(k,c){playSfx('EventAdded',.65);state.busy=true;
 const s=side(k),f=String(c.sourceFile||'');
 if(isEntrancePage(c)){
   removeCard(k,c);s.eventsPlayed++;s.eventNamesPlayed.push(c.name);s.specialPlayedThisTurn=true;
   if(/^SteveweiserEX2\.gac$/i.test(f)){drawPages(k,1);s.inPlay.push({name:c.name,sourceFile:f,card:c,cardClass:'Gameplan',duration:999,entrance:true,resolveTurn:25});state.message=`${s.name} plays Steveweiser and draws one page.`;addLog(state.message)}
   else if(/^JustBringItEX2\.gac$/i.test(f)){s.inPlay.push({name:c.name,sourceFile:f,card:c,cardClass:'Gameplan',duration:999,entrance:true,resolveTurn:4});state.message=`${s.name} plays Just Bring It! It remains in play through turn 4.`;addLog(state.message)}
   else{s.inPlay.push({name:c.name,sourceFile:f,card:c,cardClass:'Gameplan',duration:999,entrance:true});state.message=`${s.name} plays ${c.name}.`;addLog(state.message)}
   state.pile={card:c,owner:k,status:'IN PLAY'};state.busy=false;render();if(k==='cpu')scheduleCpuTurn(250);return;
 }
 if(isDamageSpecial(c)){
   state.busy=false;
   const moves=s.hand.filter(x=>!damageSpecialMoveReason(c,x,k));
   state.busy=true;
   if(!moves.length){state.busy=false;state.message='No legal Move is available for this Damage Special.';render();return}
   const apply=(move)=>{removeCard(k,c);s.discard.push(c);
     const sf=String(c.sourceFile||'');
     if(/^CrowdSupport\.gac$/i.test(sf)){drawPages(k,1);addLog(`${s.name} draws one page from Crowd Support.`)}
     if(/^WithAuthority(?:2E|EX1|EX2)?\.gac$/i.test(sf)&&['Grounded','Prone','Victim Below'].includes(state.position)){drawPages(k,1);addLog(`${s.name} draws one page from With Authority! because the opponent is on the mat.`)}
     s.pendingDamageSpecial={card:c,bonus:Number(c.damage)||0,noAutocounter:/may not be Autocountered/i.test(c.description||''),stun:Number(c.stun)||0,crowdAttitude:/^CrowdSupport\.gac$/i.test(sf)};
     addLog(`${s.name} plays ${c.name} with ${move.name}.`);resolveAttack(k,move)};
   if(k==='cpu')apply([...moves].sort((a,b)=>scoreCard(b,k)-scoreCard(a,k))[0]);else openChoiceOverlay(k,`Choose a Move to play with ${c.name}`,moves,apply,{required:true,source:'damage-special'});return;
 }
const hasOriginalPageScript=!!originalScriptForms(c,'Page_Played');if(!hasOriginalPageScript&&verifiedSpecialResolve(k,c))return;executeCertifiedOriginalEffects('Page_Played',k,c);removeCard(k,c);payCardCost(k,c);const cardMods=String(c.modifiers||'').toLowerCase();if(cardMods.includes('event')){s.eventsPlayed++;s.eventNamesPlayed.push(c.name)}s.specialPlayedThisTurn=true;if(/damage/i.test(`${c.modifiers||''} ${c.description||''}`))s.damageSpecialArmed=true;if(s.superKey==='hogan'&&c.face&&(s.hoganFaceSpecialUses||0)<5){gainMomentum(k,'Knowledge',1);s.hoganFaceSpecialUses++;addLog(`${s.name} gains 1 Knowledge for playing a Face Special (${s.hoganFaceSpecialUses}/5).`)}if(s.superKey==='lita'&&c.face){const crowd=s.deck.find(x=>/Crowd Support/i.test(x.name));if(crowd){s.deck.splice(s.deck.indexOf(crowd),1);s.hand.push(crowd);addLog(`${s.name} draws Crowd Support.`)}}if(s.superKey==='lita'&&/Crowd Support/i.test(c.name)){side(other(k)).momentum.Attitude=Math.max(0,(side(other(k)).momentum.Attitude||0)-1);addLog(`${side(other(k)).name} loses 1 Attitude from Lita's ability.`)}if(s.superKey==='shane'){s.hp=Math.min(s.maxHp,s.hp+2);side(other(k)).shanePinPenalty=(side(other(k)).shanePinPenalty||0)+2;addLog(`${s.name} heals 2 HP from playing a Special.`)}if(c.gotAllOfIt){s.pendingGotAllOfIt=true;state.pile={card:c,owner:k,status:'WITH NEXT MOVE'};state.message=`${s.name} plays Got All Of It! with the next non-defensive move.`;addLog(state.message);state.busy=false;render();if(k==='cpu')scheduleCpuTurn(250);return}if(c.callingForIt){s.pendingCallingForIt=true;if(c.face)s.alignment='Face';state.pile={card:c,owner:k,status:'NEXT MOVE'};state.message=`${s.name} plays ${c.name}. Choose a move not yet connected this match; move counters cannot stop it.`;addLog(state.message);state.busy=false;render();if(k==='cpu')scheduleCpuTurn(250);return}if(c.effect==='nextDamage')s.buffs.nextDamage=2;if(c.effect==='nextDiscount')s.buffs.nextDiscount=2;if(c.face)s.alignment='Face';if(c.heel){s.alignment='Heel';const opp=side(other(k));if(opp.superKey==='flair'){gainMomentum(other(k),'Attitude',3);addLog(`${opp.name} gains 3 Attitude because a Heel page was played.`)}}const text=(c.description||'').toLowerCase();let duration=c.tableEffect?999:c.randomDuration?(c.randomDuration.min+Math.floor(Math.random()*(c.randomDuration.max-c.randomDuration.min+1))):text.includes('remainder of the match')?999:text.includes('next 3')?3:text.includes('next two')||text.includes('next 2')?2:1;const opp=side(other(k));const ditchInPlay=(predicate,label)=>{const removed=opp.inPlay.filter(predicate);opp.inPlay=opp.inPlay.filter(x=>!predicate(x));opp.discard.push(...removed.map(x=>x.card||x));if(removed.length)addLog(`${opp.name} loses ${removed.length} ${label}${removed.length===1?'':'s'} from play.`)};if(c.removeOpponentSupport)ditchInPlay(x=>x.supportPage,'Support page');if(c.removeOpponentDamageSpecials)ditchInPlay(x=>x.cardClass==='Special'&&/damage/i.test(String(x.description||x.card?.description||'')),'Damage Special');if(c.removeOpponentGameplans)ditchInPlay(x=>x.cardClass==='Gameplan','Gameplan');if(c.removeRefereeSpecial){for(const who of ['player','cpu']){const z=side(who),removed=z.inPlay.filter(x=>/referee/i.test(x.name));z.inPlay=z.inPlay.filter(x=>!/referee/i.test(x.name));z.discard.push(...removed.map(x=>x.card||x));}}if(cardMods.includes('referee')){for(const who of ['player','cpu']){const z=side(who),removed=z.inPlay.filter(x=>/distract the referee/i.test(String(x.name||'')));z.inPlay=z.inPlay.filter(x=>!/distract the referee/i.test(String(x.name||'')));z.discard.push(...removed.map(x=>x.card||x));if(removed.length)addLog(`A Referee Special ends the distraction.`)}}if(text.includes('reduce')&&text.includes('damage'))s.buffs.damageShield=Math.max(s.buffs.damageShield,2);if(text.includes('opponent')&&text.includes('momentum')&&text.includes('cost'))side(other(k)).buffs.momentumTax=Math.max(side(other(k)).buffs.momentumTax,1);s.inPlay.push({name:c.name,sourceFile:c.sourceFile,description:c.description,modifiers:c.modifiers,duration,cardClass:c.cardClass,card:c,tableEffect:!!c.tableEffect,workingStiff:!!c.workingStiff,supportPage:!!c.supportPage,stephanieSupport:!!c.stephanieSupport,removeWhenStunned:!!c.removeWhenStunned});gainMomentum(k,'Attitude',c.momentumGain||0);state.pile={card:c,owner:k,status:'IN PLAY'};state.message=`${s.name} sets ${c.name} (${duration===999?'match':duration+' rounds'}).`;addLog(`${s.name} places ${c.name} in play.`);state.busy=false;render();if(k==='cpu')scheduleCpuTurn(550)}
function resolveAttack(k,c){if(side(k).kipUpPendingInstance===c.instance)side(k).kipUpPendingInstance=null;playSfx('GameAccepted',.55);state.busy=true;const dKey=other(k),a=side(k),d=side(dKey),cost=actualCost(c,k);removeCard(k,c);payCardCost(k,c);if(a.pendingDamageSpecial){const sp=a.pendingDamageSpecial;c={...c,attachedDamageSpecial:sp.card,attachedDamageBonus:sp.bonus,attachedSpecialStun:sp.stun||0,attachedCrowdAttitude:!!sp.crowdAttitude,uncounterable:sp.noAutocounter?true:c.uncounterable};a.pendingDamageSpecial=null;}if(/^HighCrossBody\.gac$/i.test(String(c.sourceFile||''))&&['Grounded','Prone','Victim Below'].includes(state.position)){drawPages(k,1);addLog(`${c.name}: ${a.name} draws exactly 1 page because the opponent is on the mat.`)}a.buffs.nextDiscount=0;if(a.trishNextUncounterable){c={...c,uncounterable:true};a.trishNextUncounterable=false;addLog(`${a.name}'s move cannot be countered from Trish's original ability.`)}state.pile={card:c,owner:k,status:'PLAYED'};state.message=`${a.name} plays ${c.name}. Checking for a counter…`;addLog(`${a.name} attempts ${c.name} against ${d.name}.`);dispatchOriginalEvent('Begin_Move',k,c,{'#move':c});render();setTimeout(()=>resolveCounterWindow(k,c,0),420)}

function autocounterHandValue(c){return /^WillToWin\.gac$/i.test(String(c.sourceFile||''))?3:1}
function autocounterCost(k){const s=side(k);let cost=7+(s.autocounters||0);if(s.superKey==='jeffhardy')cost-=1;if(s.superKey==='hbk')cost-=3;return Math.max(1,cost)}
function projectedAutocounterCardUtility(card,k){
  const s=side(k);
  let value=Math.max(0,scoreCard(card,k));
  if(isMovePage(card)){
    value+=10;
    const affordable=actualCost(card,k)<=totalMomentum(s)&&Object.entries(card.playMomentumRequirements||card.momentumRequirements||{}).every(([type,need])=>(s.momentum[type]||0)>=need);
    if(affordable)value+=18;
    if(card.finisher)value+=18;
    if(card.submission)value+=8;
  }else if(card.cardClass==='Momentum'){
    const gains=card.momentumChanges?.gain||{[card.momentumType]:card.momentumAmount||1};
    const useful=Object.entries(gains).some(([type,n])=>Number(n)>0&&momentumGainRoom(k,type)>0);
    value+=useful?12:0;
  }else if(card.cardClass==='Special'||card.cardClass==='Gameplan'){
    value+=6;
  }
  if(card.counterOnly)value+=8;
  return value;
}
function autocounterPlanQuality(k,attack,chosen){
  const s=side(k),chosenSet=new Set(chosen),retained=s.hand.filter(c=>!chosenSet.has(c));
  const retainedMoves=retained.filter(isMovePage);
  const immediatelyAffordableMoves=retainedMoves.filter(c=>
    actualCost(c,k)<=totalMomentum(s)&&
    Object.entries(c.momentumRequirements||{}).every(([type,need])=>(s.momentum[type]||0)>=need)
  );
  const usefulMomentum=retained.filter(c=>c.cardClass==='Momentum'&&
    Object.entries(c.momentumChanges?.gain||{[c.momentumType]:c.momentumAmount||1})
      .some(([type,n])=>Number(n)>0&&momentumGainRoom(k,type)>0));
  const oneMomentumFollowUps=[];
  for(const momentumCard of usefulMomentum){
    const projected={...s.momentum};
    for(const [type,n] of Object.entries(momentumCard.momentumChanges?.gain||{[momentumCard.momentumType]:momentumCard.momentumAmount||1}))projected[type]=(projected[type]||0)+Number(n||0);
    const projectedTotal=MOM_TYPES.reduce((n,type)=>n+(projected[type]||0),0);
    for(const move of retainedMoves){
      const reqOk=Object.entries(move.playMomentumRequirements||move.momentumRequirements||{}).every(([type,need])=>(projected[type]||0)>=Number(need));
      if(reqOk&&actualCost(move,k)<=projectedTotal)oneMomentumFollowUps.push({momentumCard,move});
    }
  }
  const retainedUtility=retained.reduce((n,c)=>n+projectedAutocounterCardUtility(c,k),0);
  const discardedUtility=chosen.reduce((n,c)=>n+projectedAutocounterCardUtility(c,k),0);
  const attackDamage=Math.max(0,Number(attack.damage)||0);
  const lowHp=s.hp<=Math.max(18,Math.floor(s.maxHp*.3));
  let threat=attackDamage*4;
  if(attack.finisher)threat+=30;
  if(attack.submission)threat+=s.hp<=25?24:10;
  if(attackDamage>=s.hp)threat+=60;
  if(lowHp)threat+=14;
  const leavesPlayableMove=immediatelyAffordableMoves.length>0;
  const leavesDevelopment=oneMomentumFollowUps.length>0;
  const emptiesHand=retained.length===0;
  const destroysTurn=!leavesPlayableMove&&!leavesDevelopment;
  let quality=threat-discardedUtility+Math.min(30,retainedUtility*.15);
  if(leavesPlayableMove)quality+=18;
  if(leavesDevelopment)quality+=10;
  if(emptiesHand)quality-=45;
  if(destroysTurn)quality-=28;
  return {quality,threat,retained,retainedMoves,immediatelyAffordableMoves,usefulMomentum,oneMomentumFollowUps,emptiesHand,destroysTurn,discardedUtility};
}
function exactAutocounterSelection(cards,cost,k='cpu',attack=null){
  const target=Math.max(1,Number(cost)||1),items=cards.map((card,index)=>({card,index,value:autocounterHandValue(card)}));
  let best=null;
  function visit(pos,total,picked){
    if(total===target){
      const chosen=picked.map(x=>x.card);
      const plan=attack?autocounterPlanQuality(k,attack,chosen):null;
      const score=plan?plan.quality:-chosen.reduce((n,c)=>n+projectedAutocounterCardUtility(c,k),0);
      if(!best||score>best.score)best={score,cards:chosen,plan};
      return;
    }
    if(total>target||pos>=items.length)return;
    visit(pos+1,total,picked);
    visit(pos+1,total+items[pos].value,[...picked,items[pos]]);
  }
  visit(0,0,[]);
  return best;
}
function chooseAutocounterPages(k,cost){
  const s=side(k);
  if(s.hand.reduce((n,c)=>n+autocounterHandValue(c),0)<cost)return null;
  if(k==='cpu')return exactAutocounterSelection([...s.hand],cost,k,null)?.cards||null;
  state.autoCounterPhase=true;
  const labels=s.hand.map((x,i)=>`${i+1}. ${x.name}${autocounterHandValue(x)!==1?` (${autocounterHandValue(x)} points)`:''}`).join('\n');
  const raw=prompt(`Autocounter by ditching pages worth exactly ${cost} points. Enter page numbers separated by commas, or Cancel.\n${labels}`,'');
  state.autoCounterPhase=false;
  if(raw===null)return null;
  const idx=[...new Set(raw.split(',').map(x=>parseInt(x.trim(),10)-1).filter(i=>i>=0&&i<s.hand.length))];
  if(idx.reduce((n,i)=>n+autocounterHandValue(s.hand[i]),0)!==cost){alert(`Choose pages worth exactly ${cost} Autocounter points. Will To Win counts as 3.`);return null}
  return idx.map(i=>s.hand[i]);
}
function tryAutocounter(k,attack){
  if(attack.uncounterable)return false;
  const s=side(k),cost=autocounterCost(k);
  if(s.hand.reduce((n,c)=>n+autocounterHandValue(c),0)<cost)return false;
  let chosen=null;
  if(k==='cpu'){
    const best=exactAutocounterSelection([...s.hand],cost,k,attack);
    if(!best?.cards)return false;
    const plan=best.plan;
    const emergency=(Number(attack.damage)||0)>=s.hp||attack.finisher&&s.hp<=30||attack.submission&&s.hp<=18;
    const hasConcreteFollowUp=!!plan&&(plan.immediatelyAffordableMoves.length>0||plan.oneMomentumFollowUps.length>0);
    if(!emergency&&(!plan||plan.quality<12||!hasConcreteFollowUp||plan.retained.length<2)){
      addLog(`${s.name} declines an Autocounter because the payment would leave no useful follow-up.`);
      return false;
    }
    chosen=best.cards;
  }else{
    const use=confirm(`${s.name} has no Move counter. Autocounter by ditching ${cost} pages?`);
    if(!use)return false;
    chosen=chooseAutocounterPages(k,cost);
  }
  if(!chosen)return false;
  const discardedNames=chosen.map(c=>c.name);
  for(const c of chosen){
    const i=s.hand.indexOf(c);
    if(i>=0)s.hand.splice(i,1);
    s.discard.push(c);
  }
  s.autocounters++;s.counters++;state.totalCounters++;
  let bonusDraw=0;
  if(s.superKey==='bigshow'&&!s.specialPlayedThisTurn&&s.autocounters<=3){
    drawPages(k,3);
    bonusDraw=3;
    addLog(`${s.name} draws 3 pages from his Autocounter ability (${s.autocounters}/3).`);
  }
  state.pile={card:attack,owner:other(k),status:'AUTOCOUNTERED'};
  state.pendingAutoCounterControl=k;
  state.autoCounterSummary={
    defender:k,
    attacker:other(k),
    moveName:attack.name,
    cost,
    discardedNames,
    bonusDraw
  };
  state.message=`AUTOCOUNTERED! ${s.name} stops ${attack.name} by ditching pages worth exactly ${cost} points. ${s.name} will gain control.`;
  addLog(`AUTOCOUNTER! ${s.name} stops ${attack.name}, ditches ${discardedNames.join(', ')} for exactly ${cost} points, and gains control.`);
  return true;
}

function resolveCounterWindow(attacker,card,depth){const defender=other(attacker),a=side(attacker),d=side(defender);const illegal=String(card.modifiers||'').toLowerCase().includes('illegal');const plead=d.hand.find(x=>x.pleadReferee)&&!d.inPlay.some(e=>e.name==='Ref Bump')&&d.alignment!=='Heel';if(illegal&&plead){removeCard(defender,plead);addWarnings(attacker,4,'Plead to the Referee');d.inPlay=d.inPlay.filter(e=>e.name!=='Distract The Referee');state.pile={card:plead,owner:defender,status:'REFEREE APPEAL'};addLog(`${d.name} plays Plead to the Referee; ${a.name} receives 4 Warnings.`)}const calling=a.pendingCallingForIt;const dstar=currentStar(defender);if(d.superKey==='bigshow'&&/2E/i.test(dstar.sourceFile||'')&&state.round-(d.gMoneyLastTurn||-99)>=10){const use=defender==='cpu'?(Number(card.damage)||0)>=4:confirm(`Use G-Money to reduce ${card.name} damage by 4?`);if(use){card={...card,damage:Math.max(0,(Number(card.damage)||0)-4)};d.gMoneyLastTurn=state.round;addLog(`${d.name} uses G-Money: ${card.name} does -4 damage.`)}}const counter=calling?null:findCounter(defender,card);if(!counter&&!calling&&tryAutocounter(defender,card)){
  a.hitStreak=0;
  a.impactStreak=0;
  a.pendingCallingForIt=false;
  state.control=defender;
  state.position='Standing';
  state.awaitingAutoCounterAck=true;
  state.busy=false;
  releaseMatchAction();
  render();
  return;
}if(counter&&depth<3){a.pendingGotAllOfIt=false;if(card.splashCounterPenalty){const loss=Math.min(card.splashCounterPenalty,totalMomentum(a));spendMomentum(attacker,loss,'Attitude');addLog(`${a.name} loses ${loss} Momentum because ${card.name} was countered.`)}if(card.counterMomentumLossMax){const loss=Math.min(Math.floor(Math.random()*(card.counterMomentumLossMax+1)),totalMomentum(a));spendMomentum(attacker,loss,'Attitude');addLog(`${a.name} loses ${loss} Momentum because ${card.name} was countered.`)}if(card.counterDefenderDiscard){for(let n=0;n<card.counterDefenderDiscard&&d.hand.length;n++){const drop=d.hand.splice(Math.floor(Math.random()*d.hand.length),1)[0];d.discard.push(drop)}if(card.counterSelfStun)a.stun=Math.max(a.stun,card.counterSelfStun)}removeCard(defender,counter);if(d.superKey==='blackman'&&!counter.defensive&&(d.blackmanCounterDraws||0)<6){drawPages(defender,1);d.blackmanCounterDraws++;addLog(`${d.name} draws a page for playing a non-Defensive counter (${d.blackmanCounterDraws}/6).`)}if(a.superKey==='undertaker'&&actualCost(card,attacker)>=6&&(a.undertakerCounterDraws||0)<5){drawPages(attacker,1);a.undertakerCounterDraws=(a.undertakerCounterDraws||0)+1;addLog(`${a.name} draws a page from The Undertaker's original ability (${a.undertakerCounterDraws}/5).`)}if(a.superKey==='lancestorm'&&a.lanceSerious){drawPages(attacker,1);a.lanceSerious=false;addLog(`${a.name} draws a page from Serious.`)}a.hitStreak=0;a.impactStreak=0;a.pendingCallingForIt=false;d.counters++;state.totalCounters++;payCardCost(defender,counter);state.pile={card:counter,owner:defender,status:`COUNTER ${depth+1}`};playSfx('Stinger4',.7);state.message=`COUNTER! ${d.name} answers with ${counter.name}.`;addLog(`${d.name} counters ${a.name}'s ${card.name} with ${counter.name}. ${card.name} is stopped and deals no damage.`);dispatchOriginalEvent('Move_Countered',attacker,card,{'#move':card,'#counter':counter});dispatchOriginalEvent('Begin_Counter',defender,counter,{'#move':card,'#counter':counter});render();const recounters=counterOptions(attacker,counter);if(recounters.length&&depth<2){addLog(`${a.name} has ${recounters.length} legal recounter option${recounters.length===1?'':'s'}.`);setTimeout(()=>resolveCounterWindow(defender,counter,depth+1),420);return}addLog(`${counter.name} now resolves as the successful counter Move Page.`);applySuccessfulAttack(defender,counter);return}dispatchOriginalEvent('No_Counter_Played',attacker,card,{'#move':card});applySuccessfulAttack(attacker,card)}
function applySuccessfulAttack(k,c){dispatchOriginalEvent('Damage_Bonus',k,c,{'#move':c});if(!state||state.ended)return;const dKey=other(k),a=side(k),d=side(dKey);a.playedMoveThisTurn=true;a.momentumPlayedSinceSuccess=false;a.pinLockedUntilMove=false;let damage=c.damage+(c.attachedDamageBonus||0)+(a.buffs.nextDamage||0)+(c.damageBonus?Math.floor(Math.random()*(c.damageBonus+1)):0);state.lastMove={name:c.name,moveType:c.originalMoveType||c.position||c.setsPosition};const mods=String(c.modifiers||'').toLowerCase();if(a.inPlay.some(e=>e.everythingHurts)&&c.method==='Strike')damage+=Object.values(d.zoneDamage).filter(x=>x>0).length;if(a.inPlay.some(e=>e.bigAndNasty)&&c.method==='Strength')damage+=2;if(a.inPlay.some(e=>e.advantageImpact)&&mods.includes('impact')){d.momentum.Attitude=Math.max(0,(d.momentum.Attitude||0)-1);if((a.momentum.Strike||0)>=4&&(a.momentum.Agility||0)>=4){damage+=3;gainMomentum(k,'Attitude',1)}}if(a.inPlay.some(e=>e.hardcore))damage=Math.max(0,damage-2);if(d.inPlay.some(e=>e.hardcore))damage=Math.max(0,damage-2);if(a.superKey==='bubba'&&mods.includes('takedown'))damage+=1;if(a.superKey==='xpac'&&mods.includes('impact'))damage+=Math.floor(Math.random()*4);if(a.superKey==='tajiri'&&c.method==='Strike'&&a.lastTurnConnectedMethod&&a.lastTurnConnectedMethod!=='Strike')damage+=4;if(a.superKey==='test'&&mods.includes('impact'))damage+=Math.max(0,a.impactStreak||0);if(d.superKey==='kane'&&!/2E/i.test(currentStar(dKey).sourceFile||'')&&mods.includes('impact'))damage=Math.max(0,damage-1);if(a.superKey==='kane'&&/2E/i.test(currentStar(k).sourceFile||'')&&state.round>20&&c.method==='Strength')damage+=2;if(a.nextMoveFlags.doubleBaseDamage){damage+=Math.max(0,Number(c.damage)||0);a.nextMoveFlags.doubleBaseDamage=false;addLog(`Get XTreme doubles ${c.name}'s base damage.`)}if(a.pendingGotAllOfIt&&isMovePage(c)){const bonus=Math.min(14,a.momentum.Strength||0);damage+=bonus;addLog(`Got All Of It! adds +${bonus} damage to ${c.name}.`);a.pendingGotAllOfIt=false}if(c.method==='Strike'&&a.inPlay.some(e=>e.workingStiff)){const bonus=Math.min(c.damage||0,1+Math.floor(Math.random()*4));damage+=bonus;addLog(`Working Stiff adds +${bonus} damage to ${c.name}.`)}if(c.stunnerDynamicBonus)damage+=Math.min(12,Math.max(a.momentum.Attitude||0,a.warnings||0));const tableOwner=['player','cpu'].find(x=>side(x).inPlay.some(e=>e.tableEffect));const tableHit=tableOwner&&String(c.modifiers||'').toLowerCase().includes('takedown')&&actualCost(c,k)>=6;if(tableHit){damage+=15;d.stun=Math.max(d.stun,2);addWarnings(k,8,'Table');const owner=side(tableOwner);owner.inPlay=owner.inPlay.filter(e=>!e.tableEffect);addLog(`${d.name} goes through the Table: +15 damage, Stun 2; ${a.name} receives 8 Warnings.`)}if(a.inPlay.some(e=>e.bounceOffRopes)&&(mods.includes('impact')||mods.includes('drop'))){damage+=3;drawPages(k,1);const rem=a.inPlay.filter(e=>e.bounceOffRopes);a.inPlay=a.inPlay.filter(e=>!e.bounceOffRopes);a.discard.push(...rem.map(e=>e.card||e))}if(a.nextMoveFlags.goingUpTop){if(mods.includes('high risk')){randomDitch(other(k),()=>true,1)}a.nextMoveFlags.goingUpTop=false}if(a.nextMoveFlags.highSpot){if(mods.includes('high risk'))gainMomentum(k,'Attitude',1);a.nextMoveFlags.highSpot=false}a.buffs.nextDamage=0;if(d.buffs.damageShield){damage=Math.max(0,damage-d.buffs.damageShield)}if(a.zoneDamage.Head>=12)damage=Math.max(0,damage-1);const hpBefore=d.hp;d.hp=Math.max(0,d.hp-damage);if(hpBefore>0&&d.hp===0){addLog(`${d.name} reaches 0 HP and must still be pinned, submitted, counted out or disqualified.`)}a.playedMoveThisTurn=true;a.hitStreak=(a.hitStreak||0)+1;a.hitStreakMethods=a.hitStreak===1?[c.method]:[...(a.hitStreakMethods||[]),c.method];const firstUnique=!a.connectedMoves.includes(c.name);if(firstUnique)a.connectedMoves.push(c.name);if(a.superKey==='eddie'&&/2E/i.test(currentStar(k).sourceFile||'')&&state.round>5&&!a.eddieMethodsDrawn.includes(c.method)){a.eddieMethodsDrawn.push(c.method);drawPages(k,1);addLog(`${a.name} draws a page for the first connected ${c.method} move.`)}if(a.superKey==='edge'&&/2E/i.test(currentStar(k).sourceFile||'')&&firstUnique){const bonus=Math.floor(Math.random()*5);a.affectPinScore=(a.affectPinScore||0)+bonus;addLog(`${a.name} gains +${bonus}% pin chance for a new connected move.`)}a.pendingCallingForIt=false;d.hitStreak=0;d.hitStreakMethods=[];const zone=/arm/i.test(c.name+c.description)?'Arm':/leg|ankle|knee/i.test(c.name+c.description)?'Leg':/head|ddt|neck/i.test(c.name+c.description)?'Head':'Body';d.zoneDamage[zone]+=damage;if(a.superKey==='benoit'){const threshold=Math.floor(d.zoneDamage[zone]/7);const prior=a.bodyThresholds[zone]||0;if(threshold>prior){drawPages(k,threshold-prior);a.bodyThresholds[zone]=threshold;addLog(`${a.name} draws ${threshold-prior} page(s) from body-part damage.`)}}if(a.superKey==='test'&&mods.includes('impact'))a.impactStreak=(a.impactStreak||0)+1;if(a.superKey==='bradshaw'&&mods.includes('impact')&&actualCost(c,k)>=5){const specials=d.hand.filter(x=>x.cardClass==='Special'&&!/Crowd Support/i.test(x.name));if(specials.length){const x=specials[Math.floor(Math.random()*specials.length)];d.hand.splice(d.hand.indexOf(x),1);d.discard.push(x);addLog(`${d.name} ditches ${x.name} from Bradshaw's ability.`)}else{const gps=d.inPlay.filter(x=>x.cardClass==='Gameplan');if(gps.length){const x=gps[Math.floor(Math.random()*gps.length)];d.inPlay.splice(d.inPlay.indexOf(x),1);d.discard.push(x);addLog(`${d.name}'s ${x.name} leaves play from Bradshaw's ability.`)}}}// Authenticity lock: a successful move does not create a generic Attitude exchange.
// Attitude may change only through an explicit original page script, printed effect,
// Superstar ability, pin rule, or other separately verified rule.
applySourcePinModifiers(k,c);if(c.face)a.alignment='Face';if(c.heel){a.alignment='Heel';if(d.superKey==='flair'){gainMomentum(dKey,'Attitude',3);addLog(`${d.name} gains 3 Attitude because a Heel page was played.`)}}if(a.superKey==='austin'&&c.attachedDamageSpecial){drawPages(k,1);addLog(`${a.name} draws a page because a Damage Special accompanied a connected move.`)}if(!originalScriptForms(c,'Move_Connected')){if(c.drawEffect){const before=a.hand.length;drawPages(k,c.drawEffect);const drawn=a.hand.length-before;if(drawn)addLog(`${c.name} effect: ${a.name} draws ${drawn} page${drawn===1?'':'s'}.`)}if(c.discardOpponent&&d.hand.length){for(let n=0;n<c.discardOpponent&&d.hand.length;n++){const dropped=d.hand.splice(Math.floor(Math.random()*d.hand.length),1)[0];d.discard.push(dropped);addLog(`${d.name} discards ${dropped.name}.`)}}if(c.discardTwoIfFour&&d.hand.length>=4){for(let n=0;n<2&&d.hand.length;n++){const dropped=d.hand.splice(Math.floor(Math.random()*d.hand.length),1)[0];d.discard.push(dropped);addLog(`${d.name} ditches ${dropped.name}.`)}}if(c.discardNonMomentum){const choices=d.hand.filter(x=>x.cardClass!=='Momentum');if(choices.length){const dropped=choices[Math.floor(Math.random()*choices.length)],i=d.hand.indexOf(dropped);d.hand.splice(i,1);d.discard.push(dropped);addLog(`${d.name} ditches non-Momentum page ${dropped.name}.`)}}if(c.discardAllStrength&&d.zoneDamage.Body>=7){const dropped=d.hand.filter(x=>x.method==='Strength');d.hand=d.hand.filter(x=>x.method!=='Strength');d.discard.push(...dropped);if(dropped.length)addLog(`${d.name} ditches ${dropped.length} Strength move(s).`)}const millCount=Math.max(Number(c.millOpponent)||0,mods.includes('$mill')?1:0);if(millCount){for(let n=0;n<millCount&&d.deck.length;n++){const milled=d.deck.shift();d.discard.push(milled);addLog(`${c.name} effect: ${d.name}'s next playbook page, ${milled.name}, is ditched.`)}if(!d.deck.length&&millCount)addLog(`${d.name}'s playbook is now empty.`)}if(c.opponentAttitudeLoss)spendMomentum(dKey,c.opponentAttitudeLoss,'Attitude');if(c.opponentAttitudeGain)gainMomentum(dKey,'Attitude',c.opponentAttitudeGain);if(c.choiceDitchSpecialOrAttitude){const pool=d.hand.filter(x=>x.cardClass==='Special');if(pool.length){const drop=pool[Math.floor(Math.random()*pool.length)];d.hand.splice(d.hand.indexOf(drop),1);d.discard.push(drop);addLog(`${d.name} ditches Special page ${drop.name}.`)}else gainMomentum(k,'Attitude',1)}if(c.moveSelfRingside)state.position='Ringside';if(c.treeOfWoe&&String(c.modifiers||'').includes('Impact')){damage+=7;d.stun=Math.max(d.stun,2)}if(c.discardSelf){for(let n=0;n<c.discardSelf&&a.hand.length;n++)a.discard.push(a.hand.pop())}if(c.recoverEffect&&a.discard.length){a.hand.push(a.discard.pop());a.recoveries++}
  if(c.selfDamage)a.hp=Math.max(0,a.hp-c.selfDamage);
  if(c.gainAttitude)gainMomentum(k,'Attitude',c.gainAttitude);
  if(c.extraZoneDamage){const z=c.extraZoneDamage.zone==='Back'?'Body':c.extraZoneDamage.zone;d.zoneDamage[z]=(d.zoneDamage[z]||0)+c.extraZoneDamage.amount;d.hp=Math.max(0,d.hp-c.extraZoneDamage.amount);addLog(`${d.name} takes ${c.extraZoneDamage.amount} additional ${z} damage.`)}
  let extraMill=c.millFixed||0;if(c.millByAttitude)extraMill+=a.momentum.Attitude||0;if(c.millByTechStrength)extraMill+=(a.momentum.Technical||0)+(a.momentum.Strength||0);if(c.chanceMillNext&&Math.random()*100<c.chanceMillNext)extraMill++;
  for(let n=0;n<extraMill&&d.deck.length;n++){const milled=d.deck.shift();d.discard.push(milled);addLog(`${d.name}'s playbook ditches ${milled.name}.`)}
  if(c.discardRandomHand){for(let n=0;n<c.discardRandomHand&&d.hand.length;n++){const i=Math.floor(Math.random()*d.hand.length),drop=d.hand.splice(i,1)[0];d.discard.push(drop);addLog(`${d.name} ditches ${drop.name}.`)}}
  if(c.discardRandomGameplan){const pool=[...d.hand.filter(x=>x.cardClass==='Gameplan').map(x=>({where:'hand',x})),...d.inPlay.filter(x=>x.cardClass==='Gameplan'||x.name).map(x=>({where:'play',x}))];if(pool.length){const pick=pool[Math.floor(Math.random()*pool.length)];if(pick.where==='hand'){d.hand.splice(d.hand.indexOf(pick.x),1);d.discard.push(pick.x)}else d.inPlay.splice(d.inPlay.indexOf(pick.x),1);addLog(`${d.name} loses a Gameplan.`)}}
  if(c.discardRandomSpecial){const pool=d.hand.filter(x=>x.cardClass==='Special');if(pool.length){const drop=pool[Math.floor(Math.random()*pool.length)];d.hand.splice(d.hand.indexOf(drop),1);d.discard.push(drop);addLog(`${d.name} ditches Special page ${drop.name}.`)}}}if(a.superKey==='jeffhardy'&&/drop/i.test(c.name+' '+(c.description||''))){drawPages(k,1);addLog(`${a.name} draws a page for connecting with a Drop move.`)}if(d.superKey==='matthardy'&&(d.hitStreak||0)>=2){const crowd=d.deck.find(x=>/Crowd Support/i.test(x.name));if(crowd){d.deck.splice(d.deck.indexOf(crowd),1);d.hand.push(crowd);addLog(`${d.name} draws Crowd Support from Matt Hardy's ability.`)}}if(d.superKey==='spike'&&damage>=4){drawPages(dKey,1);addLog(`${d.name} draws a page after taking 4 or more damage.`)}a.lastConnectedMethod=c.method||null;state.lastConnectedMove={name:c.name,moveType:c.originalMoveType||c.position||c.setsPosition};
  executeCertifiedOriginalEffects('Move_Connected',k,c);
  // Certified effects for the three competitive decks.

 if(/^KickToGut\.gac$/i.test(String(c.sourceFile||''))){
   const pred=x=>isMovePage(x)&&(String(x.position||'').toLowerCase()==='victim below'||/Stone Cold Stunner/i.test(x.name));
   const done=()=>{};
   if(k==='cpu'){const opts=a.deck.filter(pred);const pick=opts.find(x=>/Stone Cold Stunner/i.test(x.name))||opts[0];if(pick){a.deck.splice(a.deck.indexOf(pick),1);a.hand.push(pick);addLog(`${a.name} draws ${pick.name} with Kick To Gut.`)}}
   else searchDeckChoice(k,pred,'Kick To Gut — choose a Victim Below move or Stone Cold Stunner',done,true);
 }
 if(/^(?:FloatoverDDT|FloatoverDDT2E|TheRocksDDT2E)\.gac$/i.test(String(c.sourceFile||''))){if((a.momentum.Knowledge||0)>0){drawPages(k,1);gainMomentum(k,'Attitude',1)}if((a.momentum.Agility||0)>0){drawPages(k,1);gainMomentum(k,'Attitude',1)}}
 if(/^LayingTheSmackDown2E\.gac$/i.test(String(c.sourceFile||''))){drawPages(k,3);gainMomentum(k,'Attitude',2);randomDitch(dKey,x=>isMovePage(x)&&x.method==='Strike',2);if(Math.random()<.5){setMatchLocation(dKey,'Ringside',{grounded:false,reason:c.name})}else state.position='Grounded';}
 a.lastConnectedMethod=c.method;if(c.setsRingside)state.position='Ringside';else if(c.putOnMat)state.position='Grounded';else state.position=c.setsPosition==='Same'?state.position:(c.setsPosition||'Standing');if(c.attachedCrowdAttitude){gainMomentum(k,'Attitude',1);addLog(`${a.name} gains 1 Attitude from Crowd Support.`)}if(c.attachedSpecialStun){d.stun=Math.max(d.stun,Number(c.attachedSpecialStun)||0);addLog(`${d.name} is Stunned by ${c.attachedDamageSpecial?.name||'the Damage Special'}.`)}if(c.stun&&!/\(WAStun\s+#target/.test(originalScriptFor(c,'Move_Connected'))){if(d.superKey==='kane'&&!d.kaneStunIgnored){d.kaneStunIgnored=true;addLog(`${d.name} ignores the first Stun from Kane's original ability.`)}else d.stun=Math.max(d.stun,c.stun);}if(c.conditionalStun&&!d.stun&&d.hand.length<a.hand.length)d.stun=1;state.control=k;state.pile={card:c,owner:k,status:'SUCCESS'};if(c.finisher)state.lastFinisher={by:k,round:state.round};addLog(`${a.name}'s ${c.name} succeeds for ${damage} damage to ${zone}.`);gainMomentum(k,'Attitude',1);addLog(`${a.name} gains 1 Attitude for hitting with ${c.name}.`);const defenderAttitudeBefore=d.momentum.Attitude||0;d.momentum.Attitude=Math.max(0,defenderAttitudeBefore-1);if(defenderAttitudeBefore>0)addLog(`${d.name} loses 1 Attitude after being hit by ${c.name}.`);state.message=`SUCCESS! ${c.name} lands for ${damage} ${zone} damage.`;if(c.submission)return beginSubmission(k,c);if(k==='cpu'){state.awaitingCpuMoveAck=true;state.busy=false;state.message+=` Press PASS to continue.`;render();return}finishResolution()}
function submissionProfile(c){
  const text=String(c.description||'').replace(/[\r\n]+/g,' '),lower=text.toLowerCase();
  const zones=[];
  const add=(zone,n)=>{n=Number(n)||0;if(n>0)zones.push({zone,amount:n})};
  const patterns=[
    ['Arm',/(?:does|takes)\s+(\d+)\s+arm damage\s+(?:per|each) turn/ig],
    ['Leg',/(?:does|takes)\s+(\d+)\s+leg damage\s+(?:per|each) turn/ig],
    ['Head',/(?:does|takes)\s+(\d+)\s+head damage\s+(?:per|each) turn/ig],
    ['Body',/(?:does|takes)\s+(\d+)\s+(?:body|back) damage\s+(?:per|each) turn/ig]
  ];
  for(const [zone,re] of patterns){let m;while((m=re.exec(lower)))add(zone,m[1])}
  if(!zones.length){
    const m=lower.match(/(?:does|takes)\s+(\d+)\s+damage\s+(?:per|each) turn/);
    if(m)add('Body',m[1]);
  }
  const ac=(lower.match(/autocountered for\s*-(\d+)\s+pages?/)||[])[1];
  return {
    zones:zones.length?zones:[{zone:/arm/i.test(text)?'Arm':/leg|ankle|knee/i.test(text)?'Leg':/head|neck/i.test(text)?'Head':'Body',amount:Math.max(0,Number(c.damage)||0)}],
    cannotSubmit:/can(?:not|'t) submit/.test(lower),
    autocounterReduction:ac?Number(ac):0
  };
}
function submissionZoneName(hit){return hit.zone==='Back'?'Body':hit.zone}
function addSubmissionPoints(h,amountOverride=null){
  const d=side(h.defender),p=h.profile;
  let total=0;
  for(const hit of p.zones){
    const zone=submissionZoneName(hit);
    const amount=Math.max(0,amountOverride===null?Number(hit.amount)||0:Number(amountOverride)||0);
    if(!amount)continue;
    d.zoneDamage[zone]=(d.zoneDamage[zone]||0)+amount;
    d.hp=Math.max(0,d.hp-amount);
    const submissionZone=zone==='Body'?'Back':zone;
    d.submissionDamage=d.submissionDamage||{Head:0,Arm:0,Leg:0,Back:0};
    d.submissionDamage[submissionZone]=(d.submissionDamage[submissionZone]||0)+amount;
    h.submissionByZone[submissionZone]=(h.submissionByZone[submissionZone]||0)+amount;
    total+=amount;
    addLog(`${d.name} takes ${amount} ${zone} submission damage from ${h.card.name}.`);
  }
  return total;
}
function submissionCanEnd(h){
  const d=side(h.defender);
  if(h.profile.cannotSubmit||refereeDistracted())return false;
  return Object.values(d.submissionDamage||{}).some(points=>Number(points)>Number(d.hp));
}
function advanceSubmissionTurn(nextControl){
  if(!state||state.ended)return false;
  const limit=Math.max(1,Number(state.turnLimit)||DEFAULT_MATCH_TURN_LIMIT);
  if((Number(state.round)||0)>=limit){
    resolveMatchTimeLimit();
    return false;
  }
  state.round++;
  state.control=nextControl;
  return true;
}
function beginContinuedSubmissionDefenderTurn(h){
  if(!h||!state?.hold)return false;
  if(!advanceSubmissionTurn(h.defender))return false;
  const defender=side(h.defender);
  const before=defender.hand.length;
  drawPages(h.defender,1);
  const drawn=defender.hand.length-before;
  state.lastSubmissionDrawCard=drawn?defender.hand[defender.hand.length-1]:null;
  if(drawn){
    addLog(`${defender.name} draws ${state.lastSubmissionDrawCard.name} at the beginning of the continued submission turn.`);
  }else{
    addLog(`${defender.name} cannot draw at the beginning of the continued submission turn because the playbook is empty.`);
  }
  return true;
}
function beginSubmission(k,c){
  if(!originalBooleanGate('Can_Submit',k,c,{'#move':c})){addLog(`${c.name}: original scripts prevent a submission now.`);return;}
  const defender=other(k),profile=submissionProfile(c);
  const initialZone=/arm/i.test(c.name+' '+(c.description||''))?'Arm':/leg|ankle|knee/i.test(c.name+' '+(c.description||''))?'Leg':/head|neck|ddt/i.test(c.name+' '+(c.description||''))?'Head':'Body';
  const initialDamage=Math.max(0,Number(c.damage)||0);
  const persistentZone=initialZone==='Body'?'Back':initialZone;
  side(defender).submissionDamage=side(defender).submissionDamage||{Head:0,Arm:0,Leg:0,Back:0};
  side(defender).submissionDamage[persistentZone]=(side(defender).submissionDamage[persistentZone]||0)+initialDamage;
  state.lastSubmissionDrawCard=null;
  state.hold={
    attacker:k,defender,card:c,turns:1,profile,
    totalDamage:initialDamage,
    submissionByZone:{[persistentZone]:initialDamage}
  };
  dispatchOriginalEvent('Submission_Hold_Applied',k,c,{'#move':c,'#target':side(defender)});
  state.busy=false;
  state.position='Submission';
  if(!advanceSubmissionTurn(defender))return;
  state.message=`${side(k).name} locks in ${c.name}. ${initialDamage} submission damage was applied when the move connected.`;
  addLog(`${side(k).name} applies ${c.name}. Its first-turn submission damage is the damage already dealt by the successful Move Page.`);
  if(submissionCanEnd(state.hold))return end(k==='player',`${side(defender).name} submits to ${c.name}`);
  render();
  if(defender==='cpu')setTimeout(cpuDefenderInHold,500);
}
function holdEscapeSpecials(defender,h){
  return side(defender).hand.filter(c=>{
    if(c.cardClass!=='Special')return false;
    const text=String(c.description||'').toLowerCase();
    return /submission hold/.test(text)&&/(counter|break|escape|release)/.test(text)&&!legalReason(c,defender,true);
  });
}
function holdEscapeCounter(defender,h){return findCounter(defender,h.card)}
function playHoldEscape(defender,card,kind){
  const s=side(defender),attacker=h=>h.attacker;
  const h=state.hold;
  removeCard(defender,card);
  if(kind==='counter')payCardCost(defender,card);
  state.hold=null;state.lastSubmissionDrawCard=null;
  state.control=defender;
  state.position=card.setsPosition==='Same'?'Standing':(card.setsPosition||'Standing');
  side(defender).momentumPlayedSinceSuccess=false;
  state.pile={card,owner:defender,status:'ESCAPE'};
  state.message=`${s.name} breaks ${h.card.name} with ${card.name} and gains control.`;
  addLog(`${s.name} breaks the submission hold with ${card.name}. ${s.name} gains control.`);
  render();
  if(defender==='cpu')scheduleCpuTurn(450);
}
function tryVerifiedHoldEscape(defender,h){
  const counter=holdEscapeCounter(defender,h);
  const specials=holdEscapeSpecials(defender,h);
  if(defender==='cpu'){
    if(counter)return playHoldEscape(defender,counter,'counter'),true;
    if(specials.length)return playHoldEscape(defender,specials[0],'special'),true;
    return false;
  }
  const options=[...(counter?[{card:counter,kind:'counter'}]:[]),...specials.map(card=>({card,kind:'special'}))];
  if(!options.length)return false;
  const menu=options.map((x,i)=>`${i+1}. ${x.card.name}`).join('\n');
  const choice=Number(prompt(`Choose a page to break ${h.card.name}, or Cancel to remain in the hold:\n${menu}`,'1'));
  if(!Number.isInteger(choice)||choice<1||choice>options.length)return false;
  const selected=options[choice-1];
  playHoldEscape(defender,selected.card,selected.kind);
  return true;
}
function holdAutocounterCost(defender,h){return Math.max(1,autocounterCost(defender)-(h.profile.autocounterReduction||0))}
function tryHoldAutocounter(defender,h){
  const s=side(defender),cost=holdAutocounterCost(defender,h);
  if(s.hand.reduce((n,c)=>n+autocounterHandValue(c),0)<cost)return false;
  let chosen=null;
  if(defender==='cpu'){
    const best=exactAutocounterSelection([...s.hand],cost,defender,h.card);
    if(!best?.cards)return false;
    const plan=best.plan;
    const nextDamage=Math.max(...(h.profile?.zones||[]).map(z=>Number(z.amount)||0),0);
    const persistentMax=Math.max(...Object.values(s.submissionDamage||{}).map(Number),0);
    const emergency=nextDamage>=s.hp||persistentMax+nextDamage>s.hp||s.hp<=12;
    const hasConcreteFollowUp=!!plan&&(plan.immediatelyAffordableMoves.length>0||plan.oneMomentumFollowUps.length>0);
    if(!emergency&&(!plan||plan.quality<16||!hasConcreteFollowUp||plan.retained.length<2)){
      addLog(`${s.name} remains in ${h.card.name} rather than emptying the hand for an Autocounter escape.`);
      return false;
    }
    chosen=best.cards;
  }else{
    const use=confirm(`${s.name} may Autocounter ${h.card.name} by ditching ${cost} pages. Use Autocounter?`);
    if(!use)return false;
    chosen=chooseAutocounterPages(defender,cost);
  }
  if(!chosen)return false;
  for(const c of chosen){const i=s.hand.indexOf(c);if(i>=0)s.hand.splice(i,1);s.discard.push(c)}
  s.autocounters++;s.counters++;s.escapes++;state.totalCounters++;
  state.hold=null;state.lastSubmissionDrawCard=null;state.control=defender;state.position='Standing';side(defender).momentumPlayedSinceSuccess=false;
  state.message=`AUTOCOUNTER! ${s.name} escapes ${h.card.name} and gains control.`;
  addLog(`${s.name} Autocounters ${h.card.name} by ditching ${cost} pages and gains control.`);
  return true;
}
function chooseHoldMaintenancePage(k,h){
  const s=side(k);
  if(!s.hand.length)return null;
  if(k==='cpu')return [...s.hand].sort((a,b)=>scoreCard(a,k)-scoreCard(b,k))[0];
  const menu=s.hand.map((c,i)=>`${i+1}. ${c.name}`).join('\n');
  const choice=Number(prompt(`Ditch one page to keep ${h.card.name} applied, or Cancel to release it:\n${menu}`,'1'));
  if(!Number.isInteger(choice)||choice<1||choice>s.hand.length)return null;
  return s.hand[choice-1];
}
function releaseSubmission(k,reason=''){
  if(k==='player'&&!claimMatchAction('release-submission',900))return;
  const h=state?.hold;if(!h||h.attacker!==k){if(k==='player')releaseMatchAction('release-submission');return;}
  state.hold=null;state.lastSubmissionDrawCard=null;state.control=k;state.position='Grounded';side(k).momentumPlayedSinceSuccess=false;
  state.message=reason||`${side(k).name} releases ${h.card.name} and keeps control.`;
  addLog(`${side(k).name} releases ${h.card.name}. The submission Move connects and ${side(k).name} keeps control.`);
  render();if(k==='cpu')scheduleCpuTurn(450);
}
function maintainSubmission(){if(!state?.hold||state.hold.attacker!=='player'||state.busy||!claimMatchAction('maintain-submission',1100))return;submissionTick('player')}
function submissionTick(k){
  const h=state?.hold;if(!h||h.attacker!==k||state.busy)return;
  const page=chooseHoldMaintenancePage(k,h);
  if(!page)return releaseSubmission(k,`${side(k).name} releases ${h.card.name} instead of ditching a page.`);
  const s=side(k),i=s.hand.indexOf(page);
  if(i<0)return;
  s.hand.splice(i,1);s.discard.push(page);s.keptHoldThisTurn=true;
  addLog(`${s.name} ditches ${page.name} to keep ${h.card.name} applied.`);
  state.busy=true;
  dispatchOriginalEvent('Damage_Bonus',k,h.card,{'#move':h.card,'#target':side(h.defender)});
  const prevented=!originalBooleanGate('Prevent_Submission_Damage',k,h.card,{'#move':h.card,'#target':side(h.defender)});
  const scriptedBonus=Math.max(0,Number(h.card?.waValues?.Submission_Damage_Bonus)||0);
  const total=prevented?0:addSubmissionPoints(h,scriptedBonus?Math.max(...h.profile.zones.map(z=>Number(z.amount)||0))+scriptedBonus:null);
  h.card.waValues=h.card.waValues||Object.create(null);
  h.card.waValues.Submission_Damage_Bonus=0;
  h.totalDamage=(h.totalDamage||0)+total;h.turns++;
  dispatchOriginalEvent('No_Counter_Played',k,h.card,{'#move':h.card,'#target':side(h.defender)});
  state.busy=false;
  state.message=`${h.card.name} remains applied: ${total} submission damage this turn, ${h.totalDamage} total.`;
  if(submissionCanEnd(h))return end(k==='player',`${side(h.defender).name} submits to ${h.card.name}`);
  if(!beginContinuedSubmissionDefenderTurn(h))return;
  state.message+=` ${side(h.defender).name} draws one page before attempting to escape.`;
  render();
  if(h.defender==='cpu')setTimeout(cpuDefenderInHold,500);
}
function playerDefenderInHold(){
  const h=state?.hold;if(!h||h.defender!=='player')return;
  if(tryVerifiedHoldEscape('player',h))return;
  if(tryHoldAutocounter('player',h)){render();return}
  if(!advanceSubmissionTurn(h.attacker))return;
  state.message=`${state.player.name} remains trapped in ${h.card.name}. ${side(h.attacker).name} may ditch a page to keep the hold applied or release it.`;
  addLog(`${state.player.name} does not break ${h.card.name}.`);
  render();if(h.attacker==='cpu')setTimeout(cpuSubmission,450);
}
function cpuDefenderInHold(){
  const h=state?.hold;if(!h||h.defender!=='cpu')return;
  if(tryVerifiedHoldEscape('cpu',h))return;
  if(tryHoldAutocounter('cpu',h)){render();return scheduleCpuTurn(450)}
  if(!advanceSubmissionTurn(h.attacker))return;
  addLog(`${state.cpu.name} does not break ${h.card.name}.`);
  render();if(h.attacker==='cpu')setTimeout(cpuSubmission,450);
}
function cpuSubmission(){
  const h=state?.hold;if(!h||h.attacker!=='cpu')return;
  if(!state.cpu.hand.length)return releaseSubmission('cpu',`${state.cpu.name} releases ${h.card.name} because it has no page to ditch.`);
  const holdDamage=Math.max(0,...h.profile.zones.map(z=>Number(z.amount)||0));
  const heldPosition=state.position,activeHold=state.hold;
  state.position='Grounded';
  state.hold=null;
  const betterMove=state.cpu.hand
    .filter(c=>isMovePage(c)&&!c.submission&&!legalReason(c,'cpu'))
    .sort((a,b)=>scoreCard(b,'cpu')-scoreCard(a,'cpu'))[0];
  state.hold=activeHold;
  state.position=heldPosition;
  if(betterMove&&scoreCard(betterMove,'cpu')>holdDamage*2+4){
    addLog(`${state.cpu.name} releases ${h.card.name} to attempt the stronger ${betterMove.name}.`);
    return releaseSubmission('cpu',`${state.cpu.name} releases ${h.card.name} to continue with a stronger Move Page.`);
  }
  submissionTick('cpu');
}
function submissionPanel(){
  const h=state.hold,isAttacker=h.attacker==='player',isDefender=h.defender==='player';
  const byZone=Object.entries(h.submissionByZone||{}).map(([z,n])=>`${z}: ${n}`).join(' · ');
  return `<div class="submissionPanel"><b>${esc(h.card.name)} · HOLD TURN ${h.turns}</b><p>${esc(side(h.attacker).name)} is applying the hold to ${esc(side(h.defender).name)}.</p><p>${esc(byZone||'0 submission points')} · ${h.totalDamage||0} total submission damage.</p>${isDefender&&h.turns>1?`<p class="submissionDrawNotice">You drew <b>${esc(state.lastSubmissionDrawCard?.name||'one page')}</b> at the beginning of this continued hold turn. It is now visible in your hand below.</p>`:''}${isAttacker?`<div class="actions"><button class="primary" onclick="maintainSubmission()">Ditch a Page to Keep Hold</button><button class="secondary" onclick="releaseSubmission('player')">Release Hold</button></div>`:isDefender?`<div class="actions"><button class="primary" onclick="playerDefenderInHold()">Counter / Special / Autocounter</button></div>`:`<p>The opponent is resolving the submission.</p>`}</div>`;
}
function tickPersistent(){['player','cpu'].forEach(k=>{const s=side(k),keep=[];for(const e of s.inPlay){if(e.duration===999){keep.push(e);continue}e.duration--;if(e.duration>0)keep.push(e);else{dispatchOriginalEvent('Out_Of_Play',k,e.card||e,{'#page':e.card||e});s.discard.push(e.card||e);addLog(`${s.name}'s ${e.name} leaves play.`)}}s.inPlay=keep;if(!s.inPlay.some(e=>/reduce/i.test(e.name)))s.buffs.damageShield=0;if(!side(other(k)).inPlay.some(e=>/momentum/i.test(e.name)&&/cost/i.test(e.name)))s.buffs.momentumTax=0})}
function useStephanie(){if(!state||state.busy||state.control!=='player')return;const s=state.player,d=state.cpu;if(!s.inPlay.some(e=>e.stephanieSupport)||s.stephanieUsed||state.round<=25||!s.hand.length)return;const pick=s.hand.findIndex(x=>!x.stephanieSupport);if(pick<0)return;const ditched=s.hand.splice(pick,1)[0];s.discard.push(ditched);for(let i=0;i<2&&d.hand.length;i++){const j=Math.floor(Math.random()*d.hand.length),x=d.hand.splice(j,1)[0];d.discard.push(x)}if(s.deck.length)s.hand.push(s.deck.pop());s.stephanieUsed=true;state.message=`Stephanie's Special: ${s.name} ditches ${ditched.name}, the opponent ditches two random pages, and you draw the bottom page.`;addLog(state.message);render()}
function finishResolution(){if(!state||state.ended)return;tickPersistent();state.busy=false;releaseMatchAction();render();if(state.control==='cpu')scheduleCpuTurn(650)}

function end(win,reason){
  cancelCpuTurn();pendingChoiceHandler=null;if(state)state.choiceOverlay=null;invalidateScheduledActions();
  if(!state||state.ended)return;
  state.ended=true;
  state.busy=true;
  state.hold=null;
  state.awaitingCpuMoveAck=false;state.awaitingAutoCounterAck=false;state.pendingAutoCounterControl=null;state.autoCounterSummary=null;
  clearTimeout(cpuActionTimer);
  cpuActionTimer=null;
  if(state.pinTimer){clearInterval(state.pinTimer);state.pinTimer=null}
  stopCrowd();stopMusic();playSfx(win?'Stinger1':'Stinger3',.9);
  const winner=win?state.player:state.cpu;
  ensureProfile();
  if(win)profile.wins++;else profile.losses++;
  const earnedPack=win?awardVictoryBooster():null;
  profile.stats=profile.stats||{};
  const ps=profile.stats[state.player.superKey]||{wins:0,losses:0,matches:0};
  ps.matches++;if(win)ps.wins++;else ps.losses++;profile.stats[state.player.superKey]=ps;
  const reward=win?25:10;profile.credits+=reward;profile.xp+=win?30:15;
  if(activeMission&&win&&!profile.missions[activeMission.id]){profile.missions[activeMission.id]=true;profile.credits+=activeMission.reward;profile.xp+=50}
  profile.matchHistory.unshift({win,player:state.player.name,cpu:state.cpu.name,reason:reason||`${winner.name} wins the match`,rounds:state.round,date:new Date().toLocaleString()});
  profile.matchHistory=profile.matchHistory.slice(0,50);saveProfile();
  const missionBonus=activeMission&&win?activeMission.reward:0;activeMission=null;
  const finishedState=state;
  setTimeout(()=>{if(state!==finishedState)return;app.innerHTML=`<section class="screen resultScreen"><img class="resultBrandLogo" src="assets/gai/b-WWFWithAuthority.webp" alt="With Authority!"><div class="resultWord">${win?'VICTORY':'DEFEAT'}</div><div class="sub">${esc(reason||`${winner.name} wins the match`)}<br><b>+${reward} credits · +${win?30:15} XP${missionBonus?` · Mission +${missionBonus}`:''}</b></div><div class="resultStats"><div><b>${finishedState.player.hp}</b><span>${esc(finishedState.player.name)} HP</span></div><div><b>${finishedState.cpu.hp}</b><span>${esc(finishedState.cpu.name)} HP</span></div><div><b>${finishedState.round}</b><span>Rounds</span></div><div><b>${finishedState.player.pins}</b><span>Your Pins</span></div><div><b>${finishedState.player.kickouts}</b><span>Kickouts</span></div><div><b>${finishedState.player.counters}</b><span>Counters</span></div><div><b>${finishedState.player.recoveries}</b><span>Recoveries</span></div></div><div class="menu">${earnedPack?`<button class="primary" onclick="boosterHub()">Open Victory Booster</button>`:''}<button class="primary" onclick="start()">Rematch</button><button class="secondary" onclick="superstarSelect()">New Match</button><button class="secondary" onclick="home()">Main Menu</button></div></section>`},profile.settings.animations?180:0)
}

function attemptPin(k='player'){
  if(k==='player'&&!claimMatchAction('attempt-pin',1200))return false;
  if(!state||state.ended||state.busy||state.control!==k||state.hold){if(k==='player')releaseMatchAction('attempt-pin');return false;}
  const a=side(k),defenderKey=other(k),d=side(defenderKey);
  if(['player','cpu'].some(x=>side(x).inPlay.some(e=>/^SteveweiserEX2\.gac$/i.test(String(e.sourceFile||''))))&&state.round<25){state.message='Steveweiser prevents all pin attempts until turn 25.';addLog(state.message);render();return false;}
  if(a.pinLockedUntilMove){
    state.message=`${a.name} cannot attempt another pin until another Move has been played.`;
    addLog(state.message);render();return false;
  }
  if(!atLocation(k,'InTheRing')||!atLocation(defenderKey,'InTheRing')||!['Grounded','Prone','Victim Below'].includes(state.position)){
    state.message='A pin may only be attempted in the ring while the opponent is on the mat.';
    addLog(state.message);render();return false;
  }
  if(refereeDistracted()){
    state.message='The referee is distracted and cannot count a pin.';
    addLog(state.message);render();return false;
  }
  if(!originalBooleanGate('Can_Pin',k,null,{'#target':d})||!originalBooleanGate('Attempt_Pin',k,null,{'#target':d})){
    state.message='Original game effects prevent this pin attempt.';
    addLog(state.message);render();return false;
  }

  const priorAttempts=Math.max(0,Number(a.pins)||0);
  const pinCost=priorAttempts;
  if((a.momentum.Attitude||0)<pinCost){
    state.message=`Pin attempt ${priorAttempts+1} costs ${pinCost} Attitude; ${a.name} has ${a.momentum.Attitude||0}.`;
    addLog(state.message);render();return false;
  }

  if(pinCost){
    a.momentum.Attitude=Math.max(0,(a.momentum.Attitude||0)-pinCost);
    addLog(`${a.name} pays ${pinCost} Attitude for pin attempt ${priorAttempts+1}.`);
  }
  a.pins++;
  d.pinned=true;
  state.pinPending={attacker:k,target:defenderKey};
  state.busy=true;
  addLog(`${a.name} attempts to pin ${d.name}. One! Two!...`);

  const reaction=offerPinReaction(defenderKey,k);
  if(reaction?.broken){
    state.busy=false;
    if(reaction.gainsControl){
      beginTurn(defenderKey);
      finishResolution();
    }else{
      state.message=`${a.name} remains in control after the stopped pin.`;
      render();
      if(k==='cpu')scheduleCpuTurn(350);
    }
    return true;
  }

  const breakdown=recoveredPinScore(k);
  const automatic=d.hp<=0;
  const roll=automatic?0:(1+Math.floor(Math.random()*100));
  const pinned=automatic||roll<=breakdown.score;
  addLog(`PinScore ${breakdown.score}% = HP ${breakdown.healthScore} + Momentum ${breakdown.momentumScore} + Finisher ${breakdown.finisherBonus}${automatic?' (automatic at 0 HP)':`; roll ${roll}`}.`);

  d.pinned=false;
  state.pinPending=null;
  state.busy=false;

  if(pinned){
    addLog(`Three! ${d.name} has been pinned by ${a.name}.`);
    end(k==='player',`${a.name} wins by pinfall`);return true;
  }

  d.kickouts=(d.kickouts||0)+1;
  addLog(`${d.name} kicks out of ${a.name}'s pin attempt.`);
  changeControlCertified(defenderKey,'after the kick-out');
  state.position='Standing';
  state.message=`${d.name} kicks out and gains control.`;
  beginTurn(defenderKey);
  finishResolution();
  return true;
}
let pendingChoiceHandler=null;
function openChoiceOverlay(k,title,list,onChoose,{required=true,source='choice'}={}){
  const options=(list||[]).filter(Boolean);
  if(!options.length){
    addLog(`${title}: no legal targets.`);
    if(k==='player')releaseMatchAction();
    return false;
  }
  if(k==='cpu'){
    const picked=options[0];
    onChoose(picked);
    return true;
  }
  state.busy=true;
  state.choiceOverlay={title,required,source,options:options.map((card,index)=>({index,name:card.name,card}))};
  pendingChoiceHandler={matchId:state.matchId,options,onChoose,required};
  state.message=title;
  render();
  return true;
}
function resolveChoiceOverlay(index){
  if(!state?.choiceOverlay||!pendingChoiceHandler||!claimMatchAction('resolve-choice',500))return;
  if(pendingChoiceHandler.matchId!==state.matchId)return;
  const picked=pendingChoiceHandler.options[Number(index)];
  if(!picked)return;
  const handler=pendingChoiceHandler.onChoose;
  pendingChoiceHandler=null;state.choiceOverlay=null;state.busy=false;releaseMatchAction();
  handler(picked);
}
function cancelChoiceOverlay(){
  if(!state?.choiceOverlay||state.choiceOverlay.required)return;
  pendingChoiceHandler=null;state.choiceOverlay=null;state.busy=false;releaseMatchAction();render();
}
function choiceOverlayHtml(){
  const q=state?.choiceOverlay;if(!q)return'';
  return `<div class="choiceOverlay" role="dialog" aria-modal="true"><div class="choicePanel"><h2>${esc(q.title)}</h2><p>${q.required?'Choose one page to continue.':'Choose a page or cancel.'}</p><div class="choiceGrid">${q.options.map((o,i)=>`<button type="button" class="choiceCard" onclick="resolveChoiceOverlay(${i})">${cardArt(o.card)?`<img src="${esc(cardArt(o.card))}" alt="">`:''}<strong>${esc(o.name)}</strong><small>${esc(o.card.cardClass||'Page')} · Cost ${Number(o.card.momentumCost)||0}</small></button>`).join('')}</div>${q.required?'':`<button class="secondary" onclick="cancelChoiceOverlay()">Cancel</button>`}</div></div>`;
}
function searchDeckChoice(k,predicate,title,onChosen,required=true){
  const s=side(k),options=s.deck.filter(predicate);
  return openChoiceOverlay(k,title,options,picked=>{
    const i=s.deck.indexOf(picked);if(i<0){addLog(`${title}: selected page was no longer in the deck.`);render();return}
    s.deck.splice(i,1);s.hand.push(picked);s.pagesDrawn++;onChosen(picked);
  },{required,source:'deck'});
}
function ditchChoice(k,predicate,title,onChosen,required=true){
  const s=side(k),options=s.hand.filter(predicate);
  return openChoiceOverlay(k,title,options,picked=>{
    const i=s.hand.indexOf(picked);if(i<0){addLog(`${title}: selected page was no longer in hand.`);render();return}
    s.hand.splice(i,1);s.discard.push(picked);onChosen(picked);
  },{required,source:'hand'});
}
function finishAbilityChoice(k,msg){
  state.message=msg;addLog(msg);render();if(k==='cpu')scheduleCpuTurn(350);
}
function searchMultipleDeckChoice(k,predicate,title,count,onDone){
  const s=side(k),chosen=[];
  const next=()=>{
    if(chosen.length>=count){onDone(chosen);return}
    const options=s.deck.filter(predicate);
    if(!options.length){onDone(chosen);return}
    openChoiceOverlay(k,`${title} (${chosen.length+1}/${count})`,options,picked=>{
      const i=s.deck.indexOf(picked);if(i<0){onDone(chosen);return}
      s.deck.splice(i,1);s.hand.push(picked);s.pagesDrawn++;chosen.push(picked);next();
    },{required:true,source:'deck'});
  };
  next();return true;
}
function randomMomentumLoss(k,n=1){const s=side(k),types=MOM_TYPES.filter(t=>(s.momentum[t]||0)>0);for(let i=0;i<n&&types.length;i++){const t=types[Math.floor(Math.random()*types.length)];s.momentum[t]=Math.max(0,s.momentum[t]-1);if(!s.momentum[t])types.splice(types.indexOf(t),1)}}

function currentStar(k){const z=side(k);return SUPERSTARS[z.rosterKey]||SUPERSTARS[z.superKey];}
function hasCallableAbility(star){return /Special:/i.test(String(star?.abilityText||''));}
function canUseSuperstarAbility(k='player'){
  if(!state||state.ended||state.busy)return false;
  const s=side(k),star=currentStar(k);
  if(!star?.abilityImplemented||!hasCallableAbility(star))return false;
  const flairReaction=s.superKey==='flair'&&state.control!==k;
  if(state.control!==k&&!flairReaction)return false;
  if(s.momentumPlayedSinceSuccess)return false;
  const deckHas=predicate=>s.deck.some(predicate);
  switch(s.superKey){
    case 'rock':
      return /2E/i.test(star.sourceFile||'')
        ? s.abilityUses<6&&state.round>5&&state.position==='Grounded'
        : !s.abilityUsed;
    case 'tripleh':
      return /2E/i.test(star.sourceFile||'')
        ? (s.abilityUses===0?state.round>10:s.abilityUses===1?state.round>40:false)&&s.deck.length>0
        : !s.abilityUsed&&s.deck.length>0;
    case 'undertaker':
      return /2E/i.test(star.sourceFile||'')&&s.abilityUses<11&&(s.momentum.Attitude||0)>=1;
    case 'jericho':
      return /2E/i.test(star.sourceFile||'')
        ? s.abilityUses<2&&deckHas(c=>c.cardClass==='Momentum')
        : s.abilityUses<3&&(s.momentum.Attitude||0)>=1&&deckHas(c=>c.cardClass==='Momentum');
    case 'angle':
      return /2E/i.test(star.sourceFile||'')&&!s.abilityUsed;
    case 'bookert':
      return s.abilityUses<9&&s.hand.some(isMovePage);
    case 'christian':
      return s.christianUses<2&&(s.warnings||0)>0;
    case 'rvd':
      return !s.abilityUsed&&state.round>10&&!s.playedMoveThisTurn;
    case 'hogan':
      return s.abilityUses<5&&s.hand.some(c=>c.cardClass==='Special');
    case 'lita':
      return /2E/i.test(star.sourceFile||'')&&!s.abilityUsed;
    case 'goldust':
      return !s.abilityUsed&&state.round>20;
    case 'lancestorm':
      return s.abilityUses<9&&!s.lanceSerious;
    case 'rikishi':
      return s.abilityUses<2&&deckHas(c=>c.cardClass==='Momentum'&&['Strength','Strike'].includes(c.momentumType));
    case 'tazz':
      return s.abilityUses<2&&s.hand.length>0&&deckHas(c=>isMovePage(c)&&/in close/i.test(String(c.originalMoveType||c.position||'')));
    case 'nash':
      return !s.nashAbilityUsed&&['player','cpu'].some(w=>side(w).inPlay.some(e=>/referee/i.test(String(e.name||e.description||e.card?.description||''))));
    case 'trish':
      return !s.trishAbilityUsed;
    case 'bubba':
      return s.bubbaUses<2&&deckHas(c=>c.cardClass==='Special'&&(/event/i.test(String(c.modifiers||''))||/unique/i.test(String(c.modifiers||c.description||''))));
    case 'dvon':
      return s.dvonUses<2&&deckHas(c=>/weapon|ringside|set up a table|set up a ladder/i.test(`${c.modifiers||''} ${c.description||''} ${c.name||''}`));
    case 'hurricane':
      return !s.hurricaneAbilityUsed&&state.round<15&&side(other(k)).hand.some(isMovePage);
    case 'scotty':
      return s.scottyUses<4&&s.hitStreak>=2&&!s.scottyUsedThisString&&deckHas(c=>c.cardClass==='Gameplan'||(c.cardClass==='Special'&&/gameplan/i.test(String(c.modifiers||c.description||''))));
    case 'regal':
      return !s.abilityUsed&&deckHas(c=>/Distract The Referee|Plead to the Ref/i.test(c.name));
    case 'xpac':
      return !s.abilityUsed&&deckHas(c=>isMovePage(c)&&/leg extended/i.test(String(c.originalMoveType||c.description||'')));
    case 'flair':
      return state.control!==k&&s.hand.some(c=>c.cardClass==='Special'&&!/Once Too Often|Crowd Support/i.test(c.name));
    case 'alsnow':
      return !s.abilityUsed;
    case 'rey':
      return !s.abilityUsed&&s.hand.length<6&&totalMomentum(side(other(k)))>=3;
    default:
      return false;
  }
}
function useAbility(k='player'){if(k==='player'&&!claimMatchAction('superstar-ability',1000))return;if(!state||state.ended||state.busy){if(k==='player')releaseMatchAction('superstar-ability');return;}const s=side(k),star=currentStar(k);const flairReaction=s.superKey==='flair'&&state.control!==k;if(state.control!==k&&!flairReaction)return;if(!star.abilityImplemented){state.message=`${star.name}'s original ability is preserved but not enabled until its exact timing and choices are implemented.`;render();return}let msg='';
if(s.superKey==='rock'){if(/2E/i.test(star.sourceFile||'')){if(s.abilityUses>=6||state.round<=5||state.position!=='Grounded')return;drawPages(k,1);s.abilityUses++;msg=`The Great One draws one page (${s.abilityUses}/6).`}else{if(s.abilityUsed)return;drawPages(k,2);s.abilityUsed=true;msg=`The People: ${s.name} draws two pages.`}}
else if(s.superKey==='tripleh'){if(/2E/i.test(star.sourceFile||'')){const allowed=s.abilityUses===0?state.round>10:s.abilityUses===1?state.round>40:false;if(!allowed)return;searchDeckChoice(k,()=>true,'Best In The Business — choose any page',c=>{s.abilityUses++;finishAbilityChoice(k,`Best In The Business draws ${c.name} (${s.abilityUses}/2).`)});return}else{if(s.abilityUsed)return;searchDeckChoice(k,()=>true,'Be The Game — choose any page',c=>{s.abilityUsed=true;finishAbilityChoice(k,`Be The Game draws ${c.name}.`)});return}}
else if(s.superKey==='undertaker'&&/2E/i.test(star.sourceFile||'')){if(s.abilityUses>=11||(s.momentum.Attitude||0)<1)return;for(const who of ['player','cpu'])side(who).momentum.Attitude=Math.max(0,(side(who).momentum.Attitude||0)-1);s.abilityUses++;msg=`Over a Decade removes 1 Attitude from both Superstars (${s.abilityUses}/11).`}
else if(s.superKey==='jericho'){if(/2E/i.test(star.sourceFile||'')){if(s.abilityUses>=2)return;searchDeckChoice(k,c=>c.cardClass==='Momentum','King of the World — choose a Momentum page',c=>{s.momentum.Attitude=0;s.abilityUses++;finishAbilityChoice(k,`King of the World draws ${c.name} (${s.abilityUses}/2).`)});return}else{if(s.abilityUses>=3||(s.momentum.Attitude||0)<1)return;searchDeckChoice(k,c=>c.cardClass==='Momentum','Jerichoholics — choose a Momentum page',c=>{s.momentum.Attitude--;s.abilityUses++;finishAbilityChoice(k,`Jerichoholics draws ${c.name} (${s.abilityUses}/3).`)});return}}
else if(s.superKey==='angle'&&/2E/i.test(star.sourceFile||'')){if(s.abilityUsed)return;const n=Math.min(5,side('player').inPlay.length+side('cpu').inPlay.length);drawPages(k,n);s.abilityUsed=true;msg=`It's True draws ${n} page${n===1?'':'s'}.`}
else if(s.superKey==='bookert'){if(s.abilityUses>=9)return;ditchChoice(k,c=>isMovePage(c),'Can You Dig It? — ditch a Move Page',c=>{drawPages(k,1);s.abilityUses++;finishAbilityChoice(k,`Can You Dig It? ditches ${c.name} and draws a page (${s.abilityUses}/9).`)});return}
else if(s.superKey==='christian'){if(s.christianUses>=2)return;s.warnings=0;s.christianUses++;msg=`On Your Own resets ${s.name}'s Warnings to 0 (${s.christianUses}/2).`}
else if(s.superKey==='rvd'){if(s.abilityUsed||state.round<=10||s.playedMoveThisTurn)return;const n=Math.max(0,s.hitStreak||0);drawPages(k,n);gainMomentum(k,'Attitude',n);s.abilityUsed=true;s.forceEndTurn=true;msg=`R-V-D draws ${n} page${n===1?'':'s'} and gains ${n} Attitude.`}
else if(s.superKey==='hogan'){if(s.abilityUses>=5)return;const specials=s.hand.filter(c=>c.cardClass==='Special').sort((a,b)=>actualCost(a,k)-actualCost(b,k));if(!specials.length)return;const c=specials[0];removeCard(k,c);gainMomentum(k,'Knowledge',1);s.abilityUses++;msg=`The Icon ditches ${c.name} and gains 1 Knowledge (${s.abilityUses}/5).`}
else if(s.superKey==='lita'&&/2E/i.test(star.sourceFile||'')){if(s.abilityUsed)return;s.nextMoveFlags.doubleBaseDamage=true;s.abilityUsed=true;msg='Get XTreme doubles base move damage this turn.'}
else if(s.superKey==='goldust'){if(s.abilityUsed||state.round<=20)return;s.discard.push(...s.hand);s.hand=[];drawPages(k,10);s.abilityUsed=true;msg=`The Bizarre One ditches the hand and draws ten pages.`}
else if(s.superKey==='lancestorm'){if(s.abilityUses>=9)return;s.lanceSerious=true;s.abilityUses++;msg=`Serious is armed (${s.abilityUses}/9): draw a page if the next move is countered.`}
else if(s.superKey==='rikishi'){if(s.abilityUses>=2)return;searchDeckChoice(k,c=>c.cardClass==='Momentum'&&['Strength','Strike'].includes(c.momentumType),'Sultan of Squat — choose Strength or Strike Momentum',c=>{randomMomentumLoss(other(k),1);s.abilityUses++;finishAbilityChoice(k,`Sultan of Squat removes 1 opposing Momentum and draws ${c.name} (${s.abilityUses}/2).`)});return}
else if(s.superKey==='tazz'){if(s.abilityUses>=2)return;searchDeckChoice(k,c=>isMovePage(c)&&/in close/i.test(String(c.originalMoveType||c.position||'')),'Change The Mood — choose an In Close move',c=>{const drop=s.hand.length?s.hand.splice(Math.floor(Math.random()*s.hand.length),1)[0]:null;if(drop)s.discard.push(drop);s.abilityUses++;finishAbilityChoice(k,`Change The Mood draws ${c.name} (${s.abilityUses}/2).`)});return}
else if(s.superKey==='nash'){if(s.nashAbilityUsed)return;for(const who of ['player','cpu']){const z=side(who),removed=z.inPlay.filter(e=>/referee/i.test(String(e.name||e.description||'')));z.inPlay=z.inPlay.filter(e=>!/referee/i.test(String(e.name||e.description||'')));z.discard.push(...removed.map(e=>e.card||e))}s.nashAbilityUsed=true;s.abilityUsed=true;msg=`${s.name} removes the Referee from the game.`}
else if(s.superKey==='trish'){if(s.trishAbilityUsed)return;s.trishAbilityUsed=true;s.abilityUsed=true;s.trishNoMoves=true;if(Math.random()<.5){randomDitch(k,()=>true,2);msg=`${s.name} uses her Special and ditches two pages.`}else{s.trishNextUncounterable=true;msg=`${s.name} uses her Special: she will gain control at turn end and her next move cannot be countered.`;state.control=k} }
else if(s.superKey==='bubba'){if(s.bubbaUses>=2)return;searchDeckChoice(k,c=>c.cardClass==='Special'&&(/event/i.test(String(c.modifiers||''))||/unique/i.test(String(c.modifiers||c.description||''))),`Those Damn Dudleyz! — choose an Event or Unique page`,c=>{s.bubbaUses++;finishAbilityChoice(k,`Those Damn Dudleyz! draws ${c.name} (${s.bubbaUses}/2).`)});return}
else if(s.superKey==='dvon'){if(s.dvonUses>=2)return;searchDeckChoice(k,c=>/weapon|ringside|set up a table|set up a ladder/i.test(`${c.modifiers||''} ${c.description||''} ${c.name||''}`),`D-Von! Get the... — choose an eligible page`,c=>{s.dvonUses++;finishAbilityChoice(k,`D-Von! Get the... draws ${c.name} (${s.dvonUses}/2).`)});return}
else if(s.superKey==='hurricane'){if(s.hurricaneAbilityUsed||state.round>=15)return;const opp=side(other(k));openChoiceOverlay(k,'Super Powers — choose an opponent move',opp.hand.filter(isMovePage),c=>{const i=opp.hand.indexOf(c);if(i<0)return;opp.hand.splice(i,1);s.hand.push(c);const reqs=c.playMomentumRequirements||c.momentumRequirements||{},gained={};for(const [type,n] of Object.entries(reqs)){const need=Math.max(0,(Number(n)||0)-(s.momentum[type]||0));if(need){gainMomentum(k,type,need);gained[type]=need}}const flex=Math.max(0,actualCost(c,k)-totalMomentum(s));if(flex){gainMomentum(k,'Attitude',flex);gained.Attitude=(gained.Attitude||0)+flex}s.hurricaneBorrowedMomentum=gained;s.hurricaneAbilityUsed=true;s.abilityUsed=true;finishAbilityChoice(k,`Super Powers steals ${c.name} and grants enough temporary Momentum to play it.`)});return}
else if(s.superKey==='scotty'){if(s.scottyUses>=4||s.hitStreak<2||s.scottyUsedThisString)return;searchDeckChoice(k,c=>c.cardClass==='Gameplan'||(c.cardClass==='Special'&&/gameplan/i.test(String(c.modifiers||c.description||''))),'Turn it up! — choose a Gameplan Special',c=>{s.scottyUses++;s.scottyUsedThisString=true;finishAbilityChoice(k,`Turn it up! draws ${c.name} (${s.scottyUses}/4).`)});return}
else if(s.superKey==='regal'){if(s.abilityUsed)return;searchDeckChoice(k,c=>/Distract The Referee|Plead to the Ref/i.test(c.name),'Besmirched — choose a referee page',c=>{s.abilityUsed=true;state.message=`Besmirched plays ${c.name}, ignoring its normal restrictions.`;addLog(state.message);resolveCard(k,c)});return}
else if(s.superKey==='xpac'){if(s.abilityUsed)return;searchDeckChoice(k,c=>isMovePage(c)&&/leg extended/i.test(String(c.originalMoveType||c.description||'')),'Martial Arts Pro — choose a Leg Extended move',c=>{s.abilityUsed=true;finishAbilityChoice(k,`Martial Arts Pro draws ${c.name}.`)});return}
else if(s.superKey==='flair'){if(state.control===k)return;ditchChoice(k,c=>c.cardClass==='Special'&&!/Once Too Often|Crowd Support/i.test(c.name),'The Man — choose a Special name',c=>{const opp=side(other(k)),same=opp.hand.find(x=>x.name===c.name);let text;if(same){opp.hand.splice(opp.hand.indexOf(same),1);opp.deck.unshift(same);text=`The Man buries ${same.name} from ${opp.name}'s hand.`}else text=`The Man names ${c.name}, but the opponent has no copy in hand.`;finishAbilityChoice(k,text)});return}
else if(s.superKey==='alsnow'){if(s.abilityUsed)return;const n=['Agility','Knowledge','Strength','Strike','Technical'].filter(t=>(s.momentum[t]||0)>0).length;drawPages(k,n);s.abilityUsed=true;msg=`What Does Everybody Want? draws ${n} page${n===1?'':'s'}.`}
else if(s.superKey==='rey'){if(s.abilityUsed||s.hand.length>=6||totalMomentum(side(other(k)))<3)return;drawPages(k,1);s.abilityUsed=true;msg='Cruiserweight Legend draws one page.'}
else return;
state.message=msg;addLog(msg);render();if(s.forceEndTurn){s.forceEndTurn=false;state.control=other(k);finishResolution();return}if(k==='cpu')scheduleCpuTurn(350)}
function acknowledgeAutoCounter(){
  if(!state||!state.awaitingAutoCounterAck||!claimMatchAction('acknowledge-autocounter',850))return;
  const next=state.pendingAutoCounterControl;
  state.awaitingAutoCounterAck=false;
  state.pendingAutoCounterControl=null;
  state.autoCounterSummary=null;
  state.pile=null;
  state.pileFlipped=false;
  if(!next||state.ended){releaseMatchAction('acknowledge-autocounter');render();return}
  state.control=next;
  state.message=`${side(next).name} gains control after the Autocounter.`;
  beginTurn(next);
  releaseMatchAction('acknowledge-autocounter');
  render();
  if(next==='cpu')scheduleCpuTurn(650);
}
function acknowledgeCpuMove(){if(!state||!state.awaitingCpuMoveAck||!claimMatchAction('acknowledge-cpu',850))return;state.awaitingCpuMoveAck=false;state.pile=null;state.pileFlipped=false;state.message=`${state.cpu.name} remains in control.`;render();scheduleCpuTurn(220)}
let cpuActionTimer=null;
function cancelCpuTurn(){
  if(cpuActionTimer!==null)clearTimeout(cpuActionTimer);
  cpuActionTimer=null;
}
function scheduleCpuTurn(delay=250){
  if(!state||state.ended)return;
  cancelCpuTurn();
  const matchId=state.matchId;
  const serial=Number(state.actionSerial)||0;
  cpuActionTimer=setTimeout(()=>{
    cpuActionTimer=null;
    if(!state||state.ended||state.matchId!==matchId||Number(state.actionSerial||0)!==serial)return;
    cpuTurn();
  },delay);
}
function ensureCpuProgress(delay=260){
  if(!state||state.control!=='cpu'||state.busy||state.hold||state.awaitingCpuMoveAck||state.awaitingAutoCounterAck)return;
  scheduleCpuTurn(delay);
}
window.addEventListener('pageshow',()=>ensureCpuProgress(120));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)ensureCpuProgress(120)});
function cpuTurn(){if(!state||state.ended||state.busy||state.control!=='cpu'||state.hold||state.awaitingCpuMoveAck||state.awaitingAutoCounterAck)return;const s=state.cpu;
if(atLocation('cpu','Ringside')&&canUseLocationAction('cpu')&&((s.turnsAtLocation||0)>=4||atLocation('player','InTheRing')))return takeItInside('cpu');if(canUseSuperstarAbility('cpu')&&(s.hp<=20||totalMomentum(s)<=3)){const before=JSON.stringify({hand:s.hand.length,deck:s.deck.length,abilityUsed:s.abilityUsed,abilityUses:s.abilityUses,control:state.control,busy:state.busy,hold:!!state.hold,msg:state.message});useAbility('cpu');if(!state||state.ended)return;const after=JSON.stringify({hand:s.hand.length,deck:s.deck.length,abilityUsed:s.abilityUsed,abilityUses:s.abilityUses,control:state.control,busy:state.busy,hold:!!state.hold,msg:state.message});if(after!==before)return;}if(state.position==='Grounded'&&!refereeDistracted()){const pc=pinChance('cpu'),opp=state.player,finisher=state.lastFinisher&&state.lastFinisher.owner==='cpu';if(((finisher&&pc>=.30)||(opp.hp<=Math.max(12,Math.floor(opp.maxHp*.35))&&pc>=.36)||pc>=.58)&&attemptPin('cpu'))return}const legal=s.hand.filter(c=>isLegal(c,'cpu')).filter(c=>!s.momentumPlayedSinceSuccess||isMovePage(c));if(!legal.length){resolveUnusedKipUpMove('cpu');resolveScheduledEntrances('cpu');if(applyEndTurnRefereeEffects('cpu')||state.ended){render();return}state.control='player';beginTurn('player');state.message=`${s.name} passes. You gain control and draw one page for the new turn.`;addLog(`${s.name} passes. ${state.player.name} gains control and draws one page at the beginning of the turn.`);render();return}const c=[...legal].sort((a,b)=>scoreCard(b,'cpu')-scoreCard(a,'cpu'))[0];resolveCard('cpu',c)}
function momentumNeedScore(c,k){const s=side(k);if(c.cardClass!=='Momentum')return 0;const gains=c.momentumChanges?.gain||{[c.momentumType]:c.momentumAmount||1};let score=1;const candidates=[...s.hand,...s.deck.slice(0,18)].filter(x=>x.cardClass!=='Momentum');for(const card of candidates){for(const [type,need] of Object.entries(card.playMomentumRequirements||card.momentumRequirements||{})){const short=Math.max(0,need-(s.momentum[type]||0));if(short&&gains[type])score+=short*5}if(card.requirement&&gains[card.requirement])score+=3;const remaining=Math.max(0,actualCost(card,k)-totalMomentum(s));if(remaining&&Object.values(gains).reduce((a,b)=>a+b,0))score+=Math.min(remaining,5)}return score}
function scoreCard(c,k){if(isEntrancePage(c)&&isOpeningEntranceWindow())return 1000;const star=SUPERSTARS[side(k).superKey],opp=side(other(k));if(c.cardClass==='Momentum')return momentumNeedScore(c,k);let v=(c.damage||0)*2+(c.momentumGain||0)-actualCost(c,k);if((c.damage||0)>=opp.hp)v+=40;if(star.style==='submission'&&c.submission)v+=9;if(star.style==='power'&&c.requirement==='Strength')v+=5;if(star.style==='agile'&&c.requirement==='Agility')v+=5;if(star.style==='brawler'&&c.requirement==='Strike')v+=5;if(star.style==='technical'&&c.requirement==='Technical')v+=5;if(c.finisher)v+=opp.hp<=Math.max(18,Math.floor(opp.maxHp*.45))?24:12;if(c.submission&&opp.hp<22)v+=12;if(c.cardClass==='Gameplan')v+=side(k).buffs.nextDamage||side(k).buffs.nextDiscount?-5:3;if(c.counterOnly)v-=18;return v}

function removeTable(k='player'){if(k==='player'&&!claimMatchAction('remove-table',900))return;if(!state||state.busy||state.control!==k){if(k==='player')releaseMatchAction('remove-table');return;}const s=side(k);if((s.momentum.Attitude||0)<2){state.message='Needs 2 Attitude to remove Table.';render();return}let owner=null;for(const x of ['player','cpu'])if(side(x).inPlay.some(e=>e.tableEffect))owner=x;if(!owner)return;spendMomentum(k,2,'Attitude');const removed=side(owner).inPlay.filter(e=>e.tableEffect);side(owner).inPlay=side(owner).inPlay.filter(e=>!e.tableEffect);side(owner).discard.push(...removed.map(e=>e.card||e));state.message=`${s.name} pays 2 Attitude to remove Table.`;addLog(state.message);render()}
function contextualActions(p,pin){if(!state||state.control!=='player'||state.busy)return'';const out=[],star=SUPERSTARS[p.rosterKey]||SUPERSTARS[p.superKey];const abilityReady=canUseSuperstarAbility('player');if(abilityReady)out.push(`<button class="secondary specialAction" onclick="useAbility()">SPECIAL</button>`);if(!p.momentumPlayedSinceSuccess&&p.inPlay.some(e=>e.stephanieSupport)&&!p.stephanieUsed&&state.round>25&&p.hand.length)out.push('<button class="secondary" onclick="useStephanie()">Stephanie Special</button>');const locationAction=ringsideActionButton('player');if(locationAction)out.push(locationAction);
if(pin&&atLocation('player','InTheRing')&&atLocation('cpu','InTheRing'))out.push(`<button class="secondary" onclick="attemptPin()">Attempt Pin (${p.pins} ATT)</button>`);if(!p.momentumPlayedSinceSuccess&&['player','cpu'].some(x=>side(x).inPlay.some(e=>e.tableEffect))&&(p.momentum.Attitude||0)>=2)out.push('<button class="secondary" onclick="removeTable()">Remove Table (2 ATT)</button>');out.push('<button class="secondary" onclick="yieldControl()">Pass</button>');return out.join('')}
function ditchCard(i){if(!state||state.busy||state.control!=='player'||state.hold||!claimMatchAction('ditch-card',700))return;const c=state.player.hand[i];if(!c)return;if(!state.autoCounterPhase){state.message='Pages may only be ditched during an Autocounter selection.';render();return}state.player.hand.splice(i,1);state.player.discard.push(c);state.message=`${c.name} is selected for Autocounter.`;addLog(`${state.player.name} selects ${c.name} for Autocounter.`);render()}
function animateCardPlay(c,owner,done){if(!c){done?.();return}const overlay=document.createElement('div');overlay.className='cardPlayOverlay';overlay.innerHTML=`<div class="bigPlayedCard">${artImg(cardArt(c),'bigPlayedArt',c.name,'eager')}<b>${esc(c.name)}</b></div>`;document.body.appendChild(overlay);requestAnimationFrame(()=>overlay.classList.add('show'));setTimeout(()=>{overlay.classList.remove('show');setTimeout(()=>{overlay.remove();done?.()},180)},520)}
function attachCardGestures(){document.querySelectorAll('.handCard').forEach(el=>{let sx=0,sy=0,moved=false;el.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;moved=false;el.setPointerCapture?.(e.pointerId)});el.addEventListener('pointermove',e=>{if(Math.abs(e.clientX-sx)>8||Math.abs(e.clientY-sy)>8)moved=true});el.addEventListener('pointerup',e=>{e.preventDefault();const dx=e.clientX-sx,dy=e.clientY-sy,index=Number(el.dataset.index);if(Math.abs(dy)>70&&Math.abs(dy)>Math.abs(dx)){if(dy<0){const c=state?.player?.hand?.[index];const reason=c?legalReason(c,'player'):'Card unavailable';if(reason){state.message=reason;render()}else animateCardPlay(c,'player',()=>play(index))}else ditchCard(index);return}if(!moved)el.classList.toggle('flipped')})})}
function resolveScheduledEntrances(endingKey){
 if(!state)return;
 for(const owner of ['player','cpu']){
  const s=side(owner),keep=[];
  for(const e of s.inPlay){
   if(!e.entrance||Number(e.resolveTurn)!==Number(state.round)){keep.push(e);continue}
   if(/^JustBringItEX2\.gac$/i.test(String(e.sourceFile||''))){if(state.control!==owner){state.control=owner;addLog(`${s.name} gains control from Just Bring It! at the end of turn 4.`)}else{drawPages(owner,1);addLog(`${s.name} draws one page from Just Bring It! at the end of turn 4.`)}}
   else if(/^SteveweiserEX2\.gac$/i.test(String(e.sourceFile||''))){gainMomentum(owner,'Attitude',2);addLog(`${s.name} gains 2 Attitude from Steveweiser at the end of turn 25.`)}
   s.discard.push(e.card||e);addLog(`${s.name}'s ${e.name} leaves play.`)
  }
  s.inPlay=keep;
 }
}
function resolveUnusedKipUpMove(key){const s=side(key);if(!s?.kipUpPendingInstance)return;const i=s.hand.findIndex(c=>c.instance===s.kipUpPendingInstance);if(i>=0){const [drop]=s.hand.splice(i,1);s.discard.push(drop);addLog(`${s.name} ditches ${drop.name} because it was not played before the end of the Kip Up turn.`)}s.kipUpPendingInstance=null}
function yieldControl(){if(!state||state.busy||state.control!=='player'||state.hold||state.awaitingCpuMoveAck||state.awaitingAutoCounterAck||!claimMatchAction('pass',1100))return;const passer=state.player;resolveUnusedKipUpMove('player');resolveScheduledEntrances('player');if(applyEndTurnRefereeEffects('player')||state.ended){render();return}if(passer.superKey==='eddie'&&!passer.playedMoveThisTurn&&!passer.keptHoldThisTurn){const lost=Math.min(4,passer.momentum.Attitude||0);passer.momentum.Attitude-=lost;addLog(`${passer.name} loses ${lost} Attitude for ending without a move.`);if(state.round>5&&state.cpu.superKey==='eddie')drawPages('cpu',1)}if(state.round>5&&state.cpu.superKey==='eddie'&&!passer.playedMoveThisTurn)drawPages('cpu',1);state.control='cpu';beginTurn('cpu');state.message='You pass. The opponent gains control and draws one page for the new turn.';addLog(`${state.player.name} passes. ${state.cpu.name} gains control and draws one page at the beginning of the turn.`);render();scheduleCpuTurn(650)}
function momentumLine(s){return MOM_TYPES.map(t=>`${t[0]}:${s.momentum[t]||0}`).join(' · ')}
function showMatchSuperstar(key){if(!state)return;state.cardOverlay=key;state.overlayFlipped=false;render()}
function flipMatchSuperstar(){if(!state?.cardOverlay||!claimMatchAction('superstar-flip',180))return;state.overlayFlipped=!state.overlayFlipped;render()}
function closeMatchSuperstar(){if(!state)return;state.cardOverlay=null;state.overlayFlipped=false;render()}
function matchSuperstarOverlay(){if(!state?.cardOverlay)return'';const key=state.cardOverlay,s=side(key),star=SUPERSTARS[s.rosterKey||s.superKey]||SUPERSTARS[s.superKey],front=wrestlerHeadArt(s);return `<div class="matchSuperOverlay" role="dialog" aria-modal="true"><div class="matchSuperCard ${state.overlayFlipped?'flipped':''}" onclick="flipMatchSuperstar()">${state.overlayFlipped?`<div class="matchSuperBack"><h2>${esc(s.name)}</h2><div class="matchSuperMeta"><b>${s.maxHp} HP</b><span>${esc(star?.style||'')}</span></div><h3>${esc(star?.ability||'Special Ability')}</h3><p>${esc(star?.abilityText||star?.ability||'No recovered ability text.')}</p><small>Tap to view portrait</small></div>`:`<div class="matchSuperFront">${artImg(front,'matchSuperPortrait',s.name,'eager')}<strong>${esc(s.name)}</strong><small>Tap to flip</small></div>`}</div><button class="secondary compact overlayClose" onclick="event.stopPropagation();closeMatchSuperstar()">Close</button></div>`}
function wrestlerHeadArt(s){const aliases={austin:['StoneColdHeadShot'],rock:['TheRockHeadShot'],tripleh:['TripleHHeadShot'],undertaker:['TheUndertakerHeadShot'],bigshow:['TheBigShowHeadShot','TheBigShow2EHeadShot'],hogan:['HollywoodHulkHoganHeadShot2E'],trish:['TrishStratusEX3HeadShot'],benoit:['ChrisBenoit2EHeadShot'],lita:['Lita2EHeadShot'],hbk:['ShawnMichaelsHeadShot']};const base=(s.name||'').replace(/[^a-z0-9]/gi,'');const candidates=[...(aliases[s.superKey]||[]),base+'HeadShot',base+'2EHeadShot',base+'EX3HeadShot'];for(const c of candidates){const hit=ART.assets?.[artKey(c)];if(hit)return hit.file}return starArt(s.rosterKey||s.superKey)}
function wrestler(k){
  const s=side(k),head=wrestlerHeadArt(s);
  const zones=[['Head','H'],['Arm','A'],['Body','B'],['Leg','L']]
    .map(([z,l])=>`<span><b>${l}</b>${s.zoneDamage[z]||0}</span>`).join('');
  const pointsLine=k==='cpu'
    ? `<span class="pointsLine cpuPoints"><small class="dqTiny">DQ: ${s.warnings||0}</small><b>POINTS</b></span>`
    : `<span class="pointsLine"><b>POINTS</b><small class="dqTiny">DQ: ${s.warnings||0}</small></span>`;
  const hp=`<div class="hpBlock"><b class="hpValue">${s.hp}</b><div class="hpWords"><span>HIT</span>${pointsLine}</div></div>`;
  return `<div class="wrestler originalHud ${k==='cpu'?'right':''}"><button class="portraitButton" onclick="showMatchSuperstar('${k}')" aria-label="Open ${esc(s.name)} Superstar card">${artImg(head,'wrestlerHead',s.name,'eager')}</button><div class="hudText"><div class="name" title="${esc(s.name)}">${s.name}</div>${hp}<div class="momentumIcons">${momentumIcons(s)}</div><div class="limbDamage">${zones}</div></div>${s.stun?`<span class="stun">STUN ${s.stun}</span>`:''}</div>`;
}
function togglePileFlip(){if(!state?.pile||!claimMatchAction('pile-flip',180))return;state.pileFlipped=!state.pileFlipped;render()}
function pileCardHtml(c){
  const cost=actualCost(c,state.pile?.owner||'player');
  return `<article class="originalPageCard pileCard${cardMethodClass(c)} ${state.pileFlipped?'flipped':''}"><div class="cardFlip originalPageFlip"><div class="cardFace originalPageFace cardFront originalPageFront">${originalCardFrontInner(c,cost,'cardArt matchCardArt')}</div><div class="originalPageFace originalPageBack">${originalCardBackInner(c,cost)}</div></div></article>`;
}

function handEntries(){
  if(!state?.player?.hand)return[];
  const distinctMomentum=new Set();
  const entries=state.player.hand.map((c,index)=>{
    const reason=legalReason(c,'player');
    const playable=!reason;
    const isMomentum=c.cardClass==='Momentum';
    const momentumKey=c.momentumType||c.name||c.id;
    let group=3;
    if(isMomentum&&playable&&!distinctMomentum.has(momentumKey)){
      distinctMomentum.add(momentumKey);
      group=0;
    }else if(playable&&!isMomentum){
      group=1;
    }else if(!isMomentum){
      group=2;
    }else{
      group=4;
    }
    return{c,index,reason,group,score:playable?scoreCard(c,'player'):0};
  });
  const priority=x=>{if(isEntrancePage(x.c))return-100;if(state.player.superKey==='austin'&&x.c.cardClass==='Momentum'&&x.c.momentumType==='Knowledge')return-90;if(state.player.superKey==='austin'&&/^ArmDragTakedown2E\.gac$/i.test(String(x.c.sourceFile||'')))return-80;return 0};return entries.sort((a,b)=>priority(a)-priority(b)||a.group-b.group||(b.score||0)-(a.score||0)||a.index-b.index);
}
function persistentPageHtml(entry,owner,index){
  const card=entry.card||entry;
  const duration=entry.duration===999?'MATCH':`${Math.max(0,Number(entry.duration)||0)}T`;
  const art=cardArt(card);
  return `<button class="persistentPage ${owner}" type="button" onclick="showPersistentPage('${owner}',${index})" aria-label="${esc(card.name||entry.name)} in play">
    ${art?`<img src="${esc(art)}" alt="">`:''}
    <span>${esc(card.name||entry.name||'In Play')}</span>
    <small>${duration}</small>
  </button>`;
}
function persistentAreaHtml(owner){
  const items=side(owner).inPlay||[];
  return `<div class="persistentArea ${owner}" aria-label="${owner==='player'?'Your':'Opponent'} pages in play">${items.map((e,i)=>persistentPageHtml(e,owner,i)).join('')}</div>`;
}
function showPersistentPage(owner,index){
  const entry=side(owner)?.inPlay?.[index];
  if(!entry)return;
  state.pile={card:entry.card||entry,owner,status:'IN PLAY'};
  state.pileFlipped=false;
  state.message=`${side(owner).name}'s ${entry.name||entry.card?.name} is currently in play.`;
  render();
}
function render(){
  if(!state)return;
  if(!state.busy&&state.control==='player'&&!state.awaitingCpuMoveAck){
    const now=(typeof performance!=='undefined'&&performance.now)?performance.now():Date.now();
    if(now>=Number(state.inputLockUntil||0))releaseMatchAction();
  }const p=state.player,entries=handEntries(),legalCount=entries.filter(x=>!x.reason).length,pin=state.control==='player'&&state.position==='Grounded'&&!state.hold&&atLocation('player','InTheRing')&&atLocation('cpu','InTheRing')&&(p.momentum.Attitude||0)>=p.pins;app.innerHTML=`<section class="screen arena portraitArena"><div class="crowdStage"><div class="status">${wrestler('player')}${wrestler('cpu')}</div></div><div class="positionbar"><span>${esc(p.location||"InTheRing")}${p.location==="Ringside"?` · ${p.turnsAtLocation}T`:""}</span><strong>${state.position}</strong><span>${esc(state.cpu.location||"InTheRing")}${state.cpu.location==="Ringside"?` · ${state.cpu.turnsAtLocation}T`:""} · R${state.round}</span></div><div class="ring originalRing">${persistentAreaHtml('player')}${persistentAreaHtml('cpu')}<div class="ringSideControl left">${state.control==='player'?'<span class="turnBadge">YOUR TURN</span>':''}</div><div class="pile ${state.pile?state.pile.owner:''} ${state.pileFlipped?'flipped':''}" ${state.pile?'role="button" tabindex="0" onclick="togglePileFlip()"':''}>${state.pile?pileCardHtml(state.pile.card):'PLAY PILE'}</div><div class="ringSideControl right"><button class="matchGear" aria-label="Match options" onclick="toggleMatchMenu()">⚙</button>${state.control==='cpu'?'<span class="turnBadge cpuTurn">THEIR TURN</span>':''}</div></div><div class="message">${esc(state.message)}</div>${state.hold?`${submissionPanel()}<div class="gestureHint submissionHandHint">Your hand remains available during the submission.</div><div class="hand submissionHand">${entries.map(x=>cardHtml(x.c,x.index)).join('')}</div>`:state.awaitingAutoCounterAck?`<div class="autocounterNotice"><strong>AUTOCOUNTERED</strong><p>${esc(state.autoCounterSummary?`${side(state.autoCounterSummary.defender).name} stopped ${state.autoCounterSummary.moveName}.`:state.message)}</p><p>${esc(state.autoCounterSummary?`Discarded: ${state.autoCounterSummary.discardedNames.join(', ')} · ${state.autoCounterSummary.cost} points exactly.`:'')}</p><p>${esc(state.pendingAutoCounterControl?`${side(state.pendingAutoCounterControl).name} gains control after you continue.`:'')}</p></div><div class="actions contextualActions cpuAckActions"><button class="primary" onclick="acknowledgeAutoCounter()">CONTINUE</button><span>Review the Autocounter result</span></div><div class="gestureHint">The countered Move remains in the play pile until you continue.</div>`:state.awaitingCpuMoveAck?`<div class="actions contextualActions cpuAckActions">${state.player.superKey==='flair'&&canUseSuperstarAbility('player')?'<button class="secondary specialAction" onclick="useAbility(\'player\')">SPECIAL: THE MAN</button>':''}<button class="secondary" onclick="acknowledgeCpuMove()">PASS</button><span>Review opponent move</span></div><div class="gestureHint">The opponent's move remains in the play pile until you continue.</div><div class="hand">${entries.map(x=>cardHtml(x.c,x.index)).join('')}</div>`:`<div class="actions contextualActions">${contextualActions(p,pin)}</div><div class="gestureHint">Tap to flip · Swipe up to play · Swipe down only during Autocounter</div><div class="hand">${entries.map(x=>cardHtml(x.c,x.index)).join('')}</div>`}<section class="matchlog alwaysOpen"><h3>Match Log</h3>${state.log.map(x=>`<p>${esc(x)}</p>`).join('')}</section>${matchMenu()}${matchSuperstarOverlay()}${choiceOverlayHtml()}</section>`;attachCardGestures();ensureCpuProgress()}
window.cardMethodName=function(c){
  if(String(c?.cardClass||'')==='Momentum'&&c?.momentumType)return String(c.momentumType).trim();
  return String(c?.method||c?.momentumType||c?.type||'').trim();
};
const cardMethodName=window.cardMethodName;
function usesMethodColour(c){
  return ['Move','Submission','Trademark','Momentum'].includes(String(c?.cardClass||''));
}
function cardMethodClass(c){
  const raw=cardMethodName(c).toLowerCase();
  return usesMethodColour(c)&&['agility','knowledge','strength','strike','technical','attitude'].includes(raw)
    ?` method-${raw}`
    :` class-${String(c.cardClass||'page').toLowerCase()}`;
}
function cardDisplayCategory(c){
  if(usesMethodColour(c))return cardMethodName(c)||String(c.cardClass||'Page');
  const mods=String(c?.modifiers||'').split('|').map(x=>x.trim()).filter(Boolean).filter(x=>!x.startsWith('$'));
  return mods[0]||String(c?.cardClass||'Page');
}
function cardRarityStars(c){
  const n=Math.max(0,Math.min(4,Number(c?.rarityStars??c?.originalRarityId)||0));
  return n?`<span class="originalRarityStars" aria-label="${n} rarity star${n===1?'':'s'}">${'★'.repeat(n)}</span>`:'';
}
function playRequirementHtml(c){
  const entries=Object.entries(c?.playMomentumRequirements||c?.momentumRequirements||{}).filter(([,n])=>Number(n)>0);
  return entries.length?`<div class="originalRequirementStrip">${entries.map(([type,n])=>`<span class="requirement-${String(type).toLowerCase()}"><b>${Number(n)}</b> ${esc(type)}</span>`).join('')}</div>`:'';
}
function cardMoveType(c){
  const extracted=String(c.moveType||c.originalMoveType||c.sourceValues?.moveType||'').trim();
  const playedFrom=String(c.position||'').trim();
  if(extracted)return extracted;
  return playedFrom&&!/^any$/i.test(playedFrom)?playedFrom:'';
}
function originalNameBarHtml(c,badge=''){
  return `<div class="originalNameBar"><span class="originalCardTitle">${esc(c.name)}</span><span class="originalNameBarRight">${badge?`<span class="originalCountBadge">${esc(badge)}</span>`:''}${cardRarityStars(c)}</span></div>`;
}
function originalCardFrontInner(c,cost,artClass='cardArt',badge=''){
  const moveType=cardMoveType(c);
  return `${originalNameBarHtml(c,badge)}<div class="originalArtFrame">${artImg(cardArt(c),`${artClass} originalCardArt`,c.name,'eager')}</div>${playRequirementHtml(c)}<div class="originalCostBar"><span>COST: ${cost}</span><span>DMG: ${Number(c.damage)||0}</span>${moveType?`<b>${esc(moveType)}</b>`:''}</div>`;
}
function originalCardBackInner(c,cost,badge=''){
  const moveType=cardMoveType(c),category=cardDisplayCategory(c),req=Object.entries(c.playMomentumRequirements||c.momentumRequirements||{}).map(([t,n])=>`${n} ${t}`).join(' · ');
  return `${originalNameBarHtml(c,badge)}<div class="originalBackMeta"><b>${esc(category)}</b><span>${esc(c.cardClass||'Page')}${c.finisher?', Finisher':''}${c.trademark?', Trademark':''}</span></div><div class="originalBackText">${c.owner?`<p><b>${esc(c.owner)}</b></p>`:''}${c.description?`<p>${esc(c.description)}</p>`:'<p>No additional recovered text.</p>'}${req?`<p><b>Requires to play:</b> ${esc(req)}</p>`:''}${c.counters?.length?`<p><b>Counters:</b> ${c.counters.map(esc).join(', ')}</p>`:''}</div><div class="originalCostBar"><span>COST: ${cost}</span><span>DMG: ${Number(c.damage)||0}</span>${moveType?`<b>${esc(moveType)}</b>`:''}</div>`;
}
function cardBackHtml(c,cost,badge=''){return `<div class="originalPageFace originalPageBack">${originalCardBackInner(c,cost,badge)}</div>`}
function staticOriginalCardHtml(c,badge='',extra=''){
  const cost=Number(c.momentumCost)||0;
  return `<article class="card originalPageCard flippablePage${cardMethodClass(c)}" role="button" tabindex="0" onclick="if(!event.target.closest('button,a,input,select,textarea'))this.classList.toggle('flipped')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.classList.toggle('flipped')}"><div class="originalPageFlip"><div class="originalPageFace originalPageFront">${originalCardFrontInner(c,cost,'cardArt',badge)}</div><div class="originalPageFace originalPageBack">${originalCardBackInner(c,cost,badge)}</div></div>${extra}</article>`;
}
function cardHtml(c,i){const holdLocked=!!state?.hold,baseReason=legalReason(c,'player'),reason=holdLocked?'Resolve the submission using the button above.':baseReason,ok=!reason,cost=actualCost(c,'player');return `<article class="card handCard originalPageCard ${ok?'playable':'locked'}${cardMethodClass(c)}" data-index="${i}" aria-label="${esc(c.name)}${ok?'':` — ${esc(reason)}`}"><div class="cardFlip originalPageFlip"><div class="cardFace originalPageFace cardFront originalPageFront">${originalCardFrontInner(c,cost,'cardArt matchCardArt')}</div><div class="originalPageFace originalPageBack">${originalCardBackInner(c,cost)}</div></div><button class="playFallback" onclick="event.stopPropagation();${ok?`animateCardPlay(state.player.hand[${i}],'player',()=>play(${i}))`:`state.message='${esc(reason).replace(/'/g,"\'")}';render()`}">${ok?'Play Page':esc(reason)}</button></article>`}


function restoreBackupSave(){try{const backup=parseStoredProfile(BACKUP_STORE);if(!backup){alert('No previous local save is available.');return}if(!confirm('Replace the current save with the previous local backup?'))return;profile=Object.assign(blankProfile(),backup);ensureProfile();saveProfile();alert('Previous local save restored.');home()}catch{alert('The backup save could not be restored.')}}
async function storageEstimate(){try{if(navigator.storage&&navigator.storage.estimate)return await navigator.storage.estimate()}catch{}return{usage:0,quota:0}}
async function showSystemDiagnostics(){const tests=[];const add=(name,ok,detail)=>tests.push({name,ok,detail});add('Runtime card catalogue',cards.length===907,`${cards.length} / 907 records loaded`);const scriptEvents=Object.values(ORIGINAL_SCRIPT_ASTS||{}).reduce((n,r)=>n+Object.keys(r||{}).length,0);add('Original script interpreter',scriptEvents===1559,`${scriptEvents} / 1559 event scripts loaded`);add('Original roster',Object.keys(SUPERSTARS).length===42,`${Object.keys(SUPERSTARS).length} / 42 Superstars`);add('Recovered starter packages',(STARTERS.starters||[]).filter(s=>s.authenticStarter!==false).length===67,`${(STARTERS.starters||[]).filter(s=>s.authenticStarter!==false).length} / 67 authentic starters`);add('Official Product Builds',(STARTERS.starters||[]).filter(s=>s.starterType==='official-product-build').length===3,`${(STARTERS.starters||[]).filter(s=>s.starterType==='official-product-build').length} / 3 reconstructed product builds`);const missingStarters=Object.keys(SUPERSTARS).filter(k=>!starterStatus(k).ready);add('Starter deck mappings',missingStarters.length===0,missingStarters.length?`${missingStarters.length} unavailable`:'All roster starters mapped');let saveOk=false;try{const probe='wa-mobile-storage-probe';localStorage.setItem(probe,'1');localStorage.removeItem(probe);saveOk=true}catch{}add('Local save storage',saveOk,saveOk?'Read/write available':'Unavailable or blocked');add('Service worker support','serviceWorker' in navigator,'serviceWorker' in navigator?'Supported by browser':'Not supported');add('Network status',navigator.onLine,navigator.onLine?'Online — assets can update':'Offline — cached assets only');const est=await storageEstimate();const usage=est.usage?`${(est.usage/1048576).toFixed(1)} MB used`: 'Usage unavailable';add('Storage estimate',true,usage);const passed=tests.filter(x=>x.ok).length;app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>SYSTEM DIAGNOSTICS</b><span>${passed}/${tests.length}</span></div><p class="instruction">Checks mobile runtime integrity, local-save access, authentic content mappings and offline support. These checks do not alter original game balance or content.</p>${profile.saveRecovered?'<p class="warning">The current session was recovered from a local backup after the primary save could not be read.</p>':''}<div class="library">${tests.map(t=>`<article class="card ${t.ok?'':'unsupported'}"><div class="cardhead"><h3>${esc(t.name)}</h3><span class="tag">${t.ok?'PASS':'CHECK'}</span></div><p>${esc(t.detail)}</p></article>`).join('')}</div><button class="secondary" onclick="location.reload()">Reload Application</button></section>`}
window.addEventListener('error',event=>{console.error('Runtime error',event.error||event.message);try{sessionStorage.setItem('wa-last-error',JSON.stringify({message:event.message,source:event.filename,line:event.lineno,time:new Date().toISOString()}))}catch{}});
window.addEventListener('unhandledrejection',event=>{console.error('Unhandled promise rejection',event.reason);try{sessionStorage.setItem('wa-last-error',JSON.stringify({message:String(event.reason),time:new Date().toISOString()}))}catch{}});
window.addEventListener('online',()=>document.documentElement.dataset.network='online');
window.addEventListener('offline',()=>document.documentElement.dataset.network='offline');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register(`./service-worker.js?v=${encodeURIComponent(VERSION)}`,{updateViaCache:'none'}).then(reg=>reg.update()).catch(err=>console.warn('Offline cache unavailable',err)));

function showRosterStats(){app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>SUPERSTAR RECORDS</b><span>${VERSION}</span></div><div class="superGrid">${Object.values(SUPERSTARS).map(s=>{const r=recordFor(s.key);return`<article class="superCard">${artImg(starArt(s.key),'superPortrait',s.name)}<h2>${esc(s.name)}</h2><p>${esc(s.ability)}</p><p>${r.wins} wins · ${r.losses} losses · ${r.matches} matches</p><button class="secondary" onclick="deckBuilder('${s.key}')">View Playbook</button></article>`}).join('')}</div></section>`}

function chooseSuperstar(key){selectedSuperstar=key;deckChoiceScreen(key)}










function randomOpponent(){const keys=Object.keys(SUPERSTARS).filter(k=>k!==selectedSuperstar&&starterStatus(k).ready);if(!keys.length)return;setOpponent(keys[Math.floor(Math.random()*keys.length)])}

function openingHand(key){selectedSuperstar=key;start()}
function deckBuilder(key='player'){selectedSuperstar=key;const pool=poolFor(key),ids=[...deckIds(key)];profile.decks[key]=ids;const draw=()=>{app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>${SUPERSTARS[key].name} PLAYBOOK</b><span>${ids.length} pages</span></div><p class="instruction">Authentic starter decks remain locked and exact. A legal custom playbook requires at least 55 pages and exactly one Superstar page; advanced count-as copy limits remain under audit.</p><div class="deckSummary"><button class="secondary compact" onclick="resetDeck('${key}')">Reset Default</button><button class="primary compact" ${ids.length<55?'disabled':''} onclick="saveDeck('${key}')">Save Playbook</button></div><div class="library">${pool.map(c=>{const group=canonicalCountName(c),n=ids.map(id=>cardById(id)).filter(x=>x&&canonicalCountName(x)===group).length,limit=5;return`<article class="card class-${c.cardClass.toLowerCase()}"><div class="cardhead"><h3>${esc(c.name)}</h3><span class="tag">${n} / ${limit}</span></div><div class="position">${esc(c.position)} → ${esc(c.setsPosition)}</div><p>${esc(c.description)}</p><div class="stats"><span>DMG ${c.damage}</span><span>${c.cardClass==='Momentum'?esc(c.momentumType)+' +'+(c.momentumAmount||1):'ATT +'+(c.momentumGain||0)}</span><span>COST ${c.momentumCost}</span></div><div class="qty"><button onclick="changeDeck('${key}','${c.id}',-1)" ${n===0?'disabled':''}>−</button><b>${n}</b><button onclick="changeDeck('${key}','${c.id}',1)" ${n>=limit?'disabled':''}>+</button></div></article>`}).join('')}</div></section>`};window._drawDeck=draw;draw()}
function changeDeck(key,id,delta){const ids=profile.decks[key]||[];if(delta<0){const i=ids.indexOf(id);if(i>=0)ids.splice(i,1)}else{const c=poolFor(key).find(x=>x.id===id),limit=c?.cardClass==='Trademark'?1:3;if(countInDeck(ids,id)<limit)ids.push(id)}profile.decks[key]=ids;window._drawDeck()}
function saveDeck(key){if((profile.decks[key]||[]).length<25)return;saveProfile();state=null;home()}
function resetDeck(key){profile.decks[key]=defaultDeckIds(key);saveProfile();deckBuilder(key)}


/* v0.9.0 complete game shell */
function ensureProfile(){profile.decks=profile.decks||{};profile.stats=profile.stats||{};profile.matchHistory=profile.matchHistory||[];profile.missions=profile.missions||{};profile.settings=Object.assign({sound:true,music:true,musicVolume:1,sfxVolume:1,animations:true,confirmReset:true},profile.settings||{});profile.credits=profile.credits||0;profile.xp=profile.xp||0}

function firstLaunch(){app.innerHTML=`<section class="screen welcome"><div class="logo">WITH AUTHORITY!</div><div class="welcomeCard"><h1>WELCOME</h1><p>This private mobile recreation stores all progress locally on this device.</p><p>Build playbooks, complete practice missions, earn credits and play Exhibition matches with the original mobile rules engine.</p><button class="primary" onclick="completeFirstLaunch()">Enter The Game</button></div></section>`}
function completeFirstLaunch(){profile.firstLaunch=false;saveProfile();home()}

function practiceMenu(){const legacy=[{id:'control',name:'Take Control',text:'Win as Stone Cold against Triple H.',p:'austin',o:'tripleh',reward:50},{id:'submission',name:'Submission Specialist',text:'Win as Kurt Angle against Chris Jericho.',p:'angle',o:'jericho',reward:75},{id:'giant',name:'Slay The Giant',text:'Defeat Big Show as Spike Dudley.',p:'spike',o:'bigshow',reward:100}];const originals=ORIGINAL_MISSIONS.missions||[];app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>OFFLINE MISSIONS</b><span>${Object.keys(profile.missions).length} complete</span></div><div class="menu"><button class="primary" onclick="showOriginalCampaign()">Recovered Campaign Archive</button></div><h2>Original AI Challenges</h2><p class="instruction">Recovered directly from the original .gaj scenario files. Each opponent uses its exact embedded AI deck, quantities and fixed opening five.</p><div class="missionGrid">${originals.map(m=>`<article class="mission ${profile.missions['original-'+m.id]?'complete':''}"><h2>${esc(m.title)}</h2><p>${esc(m.description)}</p><b>${m.pageCount} original pages · ${profile.missions['original-'+m.id]?'COMPLETED':m.reward+' credits'}</b><button class="primary" onclick="startOriginalMission('${m.id}')">${profile.missions['original-'+m.id]?'Replay':'Start Original Challenge'}</button></article>`).join('')}</div><h2>Mobile Practice Challenges</h2><div class="missionGrid">${legacy.map(m=>`<article class="mission ${profile.missions[m.id]?'complete':''}"><h2>${m.name}</h2><p>${m.text}</p><b>${profile.missions[m.id]?'COMPLETED':m.reward+' credits'}</b><button class="secondary" onclick="startMission('${m.id}','${m.p}','${m.o}',${m.reward})">${profile.missions[m.id]?'Replay':'Start Mission'}</button></article>`).join('')}</div></section>`}
function showOriginalCampaign(){const missions=ORIGINAL_CAMPAIGN.missions||[];app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="practiceMenu()">Back</button><b>CAMPAIGN ARCHIVE</b><span>${missions.length}</span></div><p class="instruction">The recovered Mission0–Mission4 sequence is preserved intact. A deeper binary pass confirms the files use an encoded proprietary 1OAG container, so objectives and decks remain locked rather than guessed.</p><div class="missionGrid">${missions.map((m,i)=>`<article class="mission"><h2>${esc(m.title)}</h2><p>${esc(m.statusText)}</p><div class="stats"><span>${esc(m.sourceFile)}</span><span>${m.bytes} bytes</span></div><button class="secondary" disabled>${m.playable?'Play':'Locked — Recovery In Progress'}</button></article>`).join('')}</div></section>`} 
function startOriginalMission(id){const m=(ORIGINAL_MISSIONS.missions||[]).find(x=>x.id===id);if(!m)return practiceMenu();activeMission={id:'original-'+m.id,reward:m.reward,originalAiDeckIds:m.originalDeckIds,originalTitle:m.title};selectedOpponent=m.opponent;const ready=Object.keys(SUPERSTARS).filter(k=>starterStatus(k).ready);if(!ready.includes(selectedSuperstar))selectedSuperstar=ready[0]||'austin';start()}

function startMission(id,p,o,reward){activeMission={id,reward};selectedSuperstar=p;selectedOpponent=o;openingHand(p)}
function setBrowser(){const groups={};cards.forEach(c=>{const set=c.sourceSet||c.set||c.expansion||((c.modifiers||'').match(/(?:2E|EX\d|X8|LE|Tourn|SS2002)/i)||['Core'])[0];groups[set]=groups[set]||[];groups[set].push(c)});app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>SETS & EXPANSIONS</b><span>${Object.keys(groups).length}</span></div><div class="setGrid">${Object.entries(groups).sort((a,b)=>b[1].length-a[1].length).map(([n,list])=>`<article class="setCard"><h2>${esc(n)}</h2><strong>${list.length} pages</strong><p>${list.filter(c=>c.cardClass==='Trademark').length} Trademarks · ${list.filter(c=>c.cardClass==='Submission').length} Submissions</p><button class="secondary" onclick="showSet('${String(n).replace(/'/g,"\\'")}')">Browse Set</button></article>`).join('')}</div></section>`}
function showSet(name){const list=cards.filter(c=>(c.sourceSet||c.set||c.expansion||((c.modifiers||'').match(/(?:2E|EX\d|X8|LE|Tourn|SS2002)/i)||['Core'])[0])===name);app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="setBrowser()">Back</button><b>${esc(name)}</b><span>${list.length}</span></div><div class="library">${list.map(c=>libraryCard(c)).join('')}</div></section>`}
function libraryCard(c){return staticOriginalCardHtml(c,c.variantEdition||'')}
function collectionKeysForCard(c){
  return [...new Set([
    c?.id,
    c?.sourceFile,
    c?.originalUNID,
    c?.baseUNID,
    c?.unid
  ].filter(v=>v!==undefined&&v!==null&&String(v)!=='').map(String))];
}
function collectionCountForCard(c){
  ensureRewardProfile();
  let total=0;
  for(const key of collectionKeysForCard(c)){
    total+=Math.max(0,Number(profile.collection?.[key])||0);
  }
  return total;
}
function migrateCollectionInventory(){
  ensureRewardProfile();
  const migrated={};
  for(const [savedKey,value] of Object.entries(profile.collection||{})){
    const count=Math.max(0,Number(value)||0);
    if(!count)continue;
    const card=cards.find(c=>collectionKeysForCard(c).includes(String(savedKey)));
    const canonical=card?.id||savedKey;
    migrated[canonical]=(migrated[canonical]||0)+count;
  }
  const changed=JSON.stringify(migrated)!==JSON.stringify(profile.collection||{});
  profile.collection=migrated;
  if(changed)saveProfile();
}
function filterCards(type='All'){
  const library=document.getElementById('cardLibrary');
  if(!library)return;
  ensureRewardProfile();
  const query=(document.getElementById('cardSearch')?.value||'').trim().toLowerCase();
  const list=cards.filter(c=>{
    if(type!=='All'&&c.cardClass!==type)return false;
    if(!query)return true;
    return `${c.name||''} ${c.cardClass||''} ${c.description||''} ${c.variantEdition||''} ${c.sourceFile||''}`.toLowerCase().includes(query);
  }).sort((a,b)=>{
    const ownedDifference=collectionCountForCard(b)-collectionCountForCard(a);
    if(ownedDifference)return ownedDifference;
    return String(a.name||'').localeCompare(String(b.name||''));
  });
  library.innerHTML=list.length?list.map(c=>{
    const owned=collectionCountForCard(c);
    const note=owned
      ? `<div class="originalCardNote ownedCollectionNote">Owned ×${owned}</div>`
      : `<div class="originalCardNote unownedCollectionNote">Not owned</div>`;
    return staticOriginalCardHtml(c,owned?`×${owned}`:'',note);
  }).join(''):`<p class="instruction">No pages match this filter.</p>`;
  const visible=document.getElementById('collectionVisibleCount');
  if(visible)visible.textContent=String(list.length);
}
const CHARACTER_COLLECTION_IDS={
  AUSTIN:new Set([
    'OriginalExact_stsaEX1','OriginalExact_StoneColdStunnerEX1','OriginalExact_KickToGut','OriginalExact_SteveweiserEX2',
    'OriginalExact_LouTheszPressEX1','Original_DropTheHammerEX1','OriginalExact_StompAMudholeEX2',
    'OriginalExact_TwoFingerSaluteEX1','OriginalExact_WhatEX2','OriginalExact_TheRattlesnakeEX2'
  ]),
  ROCK:new Set([
    'OriginalExact_TheRock','OriginalExact_TheRock2EnoLE','RockBottom','ThePeoplesElbow','Original_TheRocksDDT2E',
    'LayingTheSmackDown2E','OriginalExact_JustBringItEX2','OriginalExact_KipUp','OriginalExact_TheBrahmaBull'
  ])
};
const CHARACTER_COLLECTIONS={
  AUSTIN:{name:'Stone Cold',matches:c=>CHARACTER_COLLECTION_IDS.AUSTIN.has(c?.id)},
  ROCK:{name:'The Rock',matches:c=>CHARACTER_COLLECTION_IDS.ROCK.has(c?.id)}
};
function collectionCardHtml(c){
  const owned=collectionCountForCard(c),cap=c.cardClass==='Superstar'?1:cardCopyCap(c),badge=c.cardClass==='Superstar'?(owned?'Owned':'Superstar'):`×${owned}/${cap}`;
  const note=owned>=cap?'Complete':owned?`Need ${cap-owned} more`:'Not owned';
  const html=staticOriginalCardHtml(c,badge,`<div class="originalCardNote">${note}</div>`);
  return owned?html:html.replace('card originalPageCard','card originalPageCard collectionUnowned');
}
function showCards(activeSet='CORE',mode='all'){
  ensureRewardProfile();
  const character=CHARACTER_COLLECTIONS[activeSet]||null;
  const selected=character?activeSet:(BOOSTER_CONFIG.sets[activeSet]?activeSet:'CORE');
  let baseList,heroName,heroImage='',totalCopies=0,ownedCopies=0,completed=0,ownedUnique=0;
  if(character){
    baseList=cards.filter(character.matches);
    heroName=character.name;
    totalCopies=baseList.reduce((n,c)=>n+(c.cardClass==='Superstar'?1:cardCopyCap(c)),0);
    ownedCopies=baseList.reduce((n,c)=>n+Math.min(c.cardClass==='Superstar'?1:cardCopyCap(c),collectionCountForCard(c)),0);
    completed=baseList.filter(c=>collectionCountForCard(c)>=(c.cardClass==='Superstar'?1:cardCopyCap(c))).length;
    ownedUnique=baseList.filter(c=>collectionCountForCard(c)>0).length;
  }else{
    const stats=setCompletionStats(selected);baseList=[...stats.list];heroName=BOOSTER_CONFIG.sets[selected].name;heroImage=BOOSTER_CONFIG.sets[selected].packImage||'';
    totalCopies=stats.totalCopies;ownedCopies=stats.ownedCopies;completed=stats.completed;ownedUnique=stats.ownedUnique;
  }
  let list=[...baseList];
  if(mode==='missing')list=list.filter(c=>collectionCountForCard(c)<(c.cardClass==='Superstar'?1:cardCopyCap(c)));
  if(mode==='owned')list=list.filter(c=>collectionCountForCard(c)>0);
  list.sort((a,b)=>{if(a.cardClass==='Superstar'&&b.cardClass!=='Superstar')return-1;if(b.cardClass==='Superstar'&&a.cardClass!=='Superstar')return 1;return collectionCountForCard(b)-collectionCountForCard(a)||String(a.name).localeCompare(String(b.name))});
  const tabs=[...Object.entries(BOOSTER_CONFIG.sets).map(([k,v])=>[k,v.name]),['AUSTIN','Stone Cold'],['ROCK','The Rock']];
  app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>CARD COLLECTION</b><span>${ownedUnique}/${baseList.length}</span></div><div class="setTabs">${tabs.map(([k,n])=>`<button class="secondary compact ${k===selected?'active':''}" onclick="showCards('${k}','${mode}')">${esc(n)}</button>`).join('')}</div><div class="collectionSetHero">${heroImage?`<img src="${heroImage}" alt="">`:''}<div><h2>${esc(heroName)}</h2><p>${completed}/${baseList.length} cards complete</p><p>${ownedCopies}/${totalCopies} copies owned</p></div></div><div class="filterbar"><button class="secondary compact" onclick="showCards('${selected}','all')">All</button><button class="secondary compact" onclick="showCards('${selected}','owned')">Owned</button><button class="secondary compact" onclick="showCards('${selected}','missing')">Missing / incomplete</button></div><div class="library originalCardLibrary">${list.map(collectionCardHtml).join('')||'<p class="instruction">No cards in this view.</p>'}</div></section>`;
}

async function showVariants(){
  let report;try{report=await fetch('data/variant-audit.json').then(r=>r.json())}catch{return}
  app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>MOVE VARIANT AUDIT</b><span>${report.cardsInVariantGroups} pages</span></div><p class="instruction">Same-named pages remain separate whenever their original source, edition, artwork, text, cost, damage, momentum, counters, restrictions, or scripts differ. Exact gameplay duplicates still retain their source edition identity.</p><div class="auditSummary"><article><b>${report.variantGroups}</b><span>variant groups</span></article><article><b>${report.newExactEquivalentVariantsImported}</b><span>new variants imported</span></article><article><b>${report.totalPlayableRecords}</b><span>playable records</span></article></div><input id="variantSearch" class="search" placeholder="Search move variants..." oninput="filterVariants()"><div id="variantList" class="library">${report.groups.map(variantGroupHtml).join('')}</div></section>`;
  window._variantReport=report;
}
function variantGroupHtml(g){return `<article class="setCard variantGroup" data-search="${esc((g.displayName+' '+g.editions.join(' ')).toLowerCase())}"><h2>${esc(g.displayName)}</h2><strong>${g.count} source variants · ${g.uniqueGameplayVariants} gameplay configurations</strong><p>${g.editions.map(x=>`<span class="tag">${esc(x)}</span>`).join(' ')}</p><details><summary>Compare every variant</summary>${g.cards.map(v=>`<div class="variantRow"><b>${esc(v.edition||'Core')}</b><span>${esc(v.sourceFile||'')}</span><span>DMG ${v.damage} · COST ${v.cost} · ATT +${v.connectedMomentum||0}</span><small>${esc(v.text||'')}</small></div>`).join('')}</details></article>`}
function filterVariants(){const q=(document.querySelector('#variantSearch')?.value||'').toLowerCase();document.querySelectorAll('.variantGroup').forEach(x=>x.hidden=!x.dataset.search.includes(q))}
function starterDeckBrowser(){
  const rows=(STARTERS.starters||[]).map(st=>{const art=starterEditionArt(st),edition=cleanEditionLabel(st),label=starterEditionCardLabel(st);return `<article class="entityCard starterTile flipEntity" data-flip-entity><div class="entityFlipInner"><div class="entityFace entityFront">${art?artImg(art,'entityPortrait fullEntityArt',label):'<div class="entityPortrait placeholderPortrait">WA</div>'}<div class="entityFrontTitle"><h3>${esc(cleanStarterTitle(st))}</h3><small>${esc(edition)} · Tap to flip</small></div></div><div class="entityFace entityBack"><div class="entityBody"><h3>${esc(cleanStarterTitle(st))}</h3><p>${esc(edition)} · ${st.count} pages</p><p class="starterCardSource">Superstar card: ${esc(label)}</p><p>${st.mappedPlayable} playable · ${st.missingCount} awaiting support</p><div class="entityActions"><button class="secondary compact" type="button" data-starter-detail="${esc(st.id)}">Inspect Exact Deck</button></div><small class="flipHint">Tap outside the button to flip back</small></div></div></div></article>`}).join('');
  app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>AUTHENTIC STARTER DECKS</b><span>${STARTERS.count||0}</span></div><p class="instruction">Each front shows the complete original edition artwork. Tap a card to flip it for edition, deck and source details.</p><input id="entitySearch" class="search" placeholder="Search starter decks..." oninput="filterEntityGrid()"><div id="entityGrid" class="entityGrid">${rows}</div></section>`;
  attachEntityCardGestures();
  document.querySelectorAll('[data-starter-detail]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();starterDeckDetail(btn.dataset.starterDetail)}));
}
function starterDeckDetail(id){
  const s=(STARTERS.starters||[]).find(x=>x.id===id);if(!s)return starterDeckBrowser();
  const byId=new Map(cards.map(c=>[c.id,c]));
  const counts=new Map();s.entries.forEach(e=>{const key=e.cardId||`missing-${e.unid}`;if(!counts.has(key))counts.set(key,{...e,qty:0});counts.get(key).qty++});
  const rows=[...counts.values()].map(e=>{const c=e.cardId?byId.get(e.cardId):null;return c?staticOriginalCardHtml(c,`×${e.qty}`):`<article class="card unsupported"><div class="cardhead"><h3>Original page #${e.unid}</h3><span class="tag">×${e.qty}</span></div><p>Source: ${esc(e.sourceFile||'unmapped original object')}</p><div class="stats"><span>Awaiting exact implementation</span></div></article>`}).join('');
  const editionArt=starterEditionArt(s),editionCard=starterSuperstarCard(s),editionLabel=starterEditionCardLabel(s);
  app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="starterDeckBrowser()">Back</button><b>${esc(cleanStarterTitle(s))}</b><span>${s.count} pages</span></div><div class="starterDetailHero">${editionArt?artImg(editionArt,'starterEditionPortrait',editionLabel):''}<div><h2>${esc(editionLabel)}</h2><p>${esc(cleanEditionLabel(s))} Superstar card used by this exact package.</p><p>${esc(s.description)} Exact order and duplicate quantities are retained from ${esc(s.sourceFile)}.</p></div></div><div class="deckSummary"><span>${s.mappedPlayable} supported · ${s.missingCount} pending</span>${s.missingCount===0?`<button class="primary compact" onclick="installAuthenticStarter('${esc(id)}')">Use This Starter</button>`:''}</div><div class="library">${rows}</div></section>`;
}
function installAuthenticStarter(id){const s=(STARTERS.starters||[]).find(x=>x.id===id);if(!s||s.entries.some(e=>!e.cardId))return;const key=Object.keys(STARTER_MAP).find(k=>STARTER_MAP[k]===id)||selectedSuperstar;profile.decks[key]=s.entries.map(e=>e.cardId);saveProfile();selectedSuperstar=key;selectedDeckMode='starter';selectedRecommendedDeck=null;opponentSelect()}



async function showBrandingAudit(){
 const r=await fetch('data/original-branding-audit-v0953.json').then(x=>x.json());
 app.innerHTML=`<section class="screen brandingAudit"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>ORIGINAL BRANDING AUDIT</b><span>${r.assetsIntegrated}</span></div><img class="auditBrandLogo" src="assets/gai/b-WWFWithAuthority.webp" alt="With Authority!"><div class="resultStats"><div><b>${r.assetsIntegrated}</b><span>assets integrated</span></div><div><b>${r.interfaceFamilies}</b><span>UI families</span></div><div><b>${r.remainingUnusualGai}</b><span>unusual GAI pending</span></div><div><b>${r.excludedOnlineStore}</b><span>online/store excluded</span></div></div><p class="instruction">Original recoverable offline branding is now used across the home screen, match arena, navigation chrome, page backs, boosters, sets, result screens, PWA icon and preservation screens. Online and paid-store-specific branding remains intentionally excluded.</p><div class="brandingGrid">${r.integrated.map(x=>`<article><img src="${esc(x.asset)}" alt="${esc(x.use)}"><div><b>${esc(x.use)}</b><small>${esc(x.asset.split('/').pop())}</small></div></article>`).join('')}</div><h2>Still pending deeper decoding</h2><div class="library">${r.pending.map(x=>`<article class="card unsupported"><h3>${esc(x.group)}</h3><p>${esc(x.detail)}</p></article>`).join('')}</div></section>`;
}

async function showOriginalRules(){
  const r=await fetch('data/original-rules-guide.json').then(x=>x.json());
  const statusClass=v=>v==='verified'||v==='implemented'?'ruleGood':v==='partial'?'rulePartial':'rulePending';
  app.innerHTML=`<section class="screen rulesGuide"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>ORIGINAL RULES GUIDE</b><span>${esc(r.version)}</span></div>
  <p class="instruction">Extracted from the original executable help, New Player Guide, expansion rules and tutorial resources. The verification section clearly separates original rules from mobile systems still under audit.</p>
  <div class="rulesSources">${r.sources.map(x=>`<article><b>${esc(x.name)}</b><span>${esc(x.scope)}</span></article>`).join('')}</div>
  <div class="rulesSections">${r.sections.map(sec=>`<details open><summary>${esc(sec.title)}</summary>${sec.rules.map(x=>`<article class="ruleItem"><p>${esc(x.rule)}</p><small>${esc(x.source)}</small></article>`).join('')}</details>`).join('')}</div>
  <h2>Mobile Engine Verification</h2><div class="rulesChecklist">${r.verification.map(x=>`<article class="${statusClass(x.status)}"><div><b>${esc(x.system)}</b><span>${esc(x.status)}</span></div><p>${esc(x.detail)}</p></article>`).join('')}</div>
  </section>`;
}

async function showRoundRobinAudit(){const r=await fetch('data/ai-round-robin-v0948.json').then(x=>x.json());app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>AI ROUND-ROBIN AUDIT</b><span>${r.simulations}</span></div><div class="resultStats"><div><b>${r.starterVariantsAudited}</b><span>starter variants</span></div><div><b>${r.deadlocks}</b><span>diagnostic deadlocks</span></div><div><b>${r.finishReasons.pin||0}</b><span>pin finishes</span></div><div><b>${r.repetitionsPerOrderedMatchup}</b><span>repeats per matchup</span></div></div><p class="instruction">This balance diagnostic simulates every ordered authentic starter matchup using fixed Lead Off pages, turn draws, one Momentum page before a move, method-specific costs, counters, damage and strategic pin attempts. Complex player-choice effects are approximated, so results identify balance risks rather than certify exact outcomes.</p><h2>Highest win rates</h2><div class="library">${r.results.slice(0,10).map(x=>`<article class="card"><div class="cardhead"><h3>${esc(x.title)}</h3><span class="tag">${x.winRate}%</span></div><div class="stats"><span>${x.w} wins</span><span>${x.l} losses</span><span>${x.d} draws</span></div><p>${x.avgTurns} average turns · ${x.avgMoves} moves</p></article>`).join('')}</div><h2>Lowest win rates</h2><div class="library">${r.results.slice(-10).reverse().map(x=>`<article class="card"><div class="cardhead"><h3>${esc(x.title)}</h3><span class="tag">${x.winRate}%</span></div><div class="stats"><span>${x.w} wins</span><span>${x.l} losses</span><span>${x.d} draws</span></div><p>${x.avgTurns} average turns · ${x.avgMoves} moves</p></article>`).join('')}</div></section>`}
async function showSimulationAudit(){const r=await fetch('data/full-match-simulation-v0935.json').then(x=>x.json());app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>MATCH SIMULATION AUDIT</b><span>${r.startersAudited}</span></div><div class="resultStats"><div><b>${r.simulations}</b><span>simulations</span></div><div><b>${r.hardOpeningLocks}</b><span>opening locks</span></div><div><b>${r.paymentFailures}</b><span>payment failures</span></div><div><b>${r.startersWithLegalOpening}</b><span>legal openings</span></div></div><p class="instruction">This historical audit validates authentic fixed opening hands and one-page turn draws. Its older cost-consumption conclusions are superseded by the permanent method Momentum rules and should not be treated as current gameplay certification. It does not certify every advanced card script.</p><div class="library">${r.starters.map(x=>`<article class="card"><div class="cardhead"><h3>${esc(x.title)}</h3><span class="tag">${x.pages} pages</span></div><div class="stats"><span>${x.openingLegal} legal opening pages</span><span>${x.attackPages} attacks</span><span>${x.momentumPages} Momentum</span></div><p>${esc(x.status)}</p></article>`).join('')}</div></section>`}

async function showCardBehaviourAudit(){
 const r=await fetch('data/full-card-behaviour-audit-v0943.json').then(x=>x.json());
 const c=r.catalogueCertification,e=r.starterEntryCertification;
 app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>FULL CARD BEHAVIOUR AUDIT</b><span>${r.starterDecksAudited} starters</span></div><div class="resultStats"><div><b>${c.exact_certified||0}</b><span>exact-certified cards</span></div><div><b>${c.runtime_interpreted||0}</b><span>shared interpreter</span></div><div><b>${c.preserved_needs_verification||0}</b><span>needs verification</span></div><div><b>${c.disabled||0}</b><span>disabled</span></div></div><p class="instruction">The original starter definitions contain ${r.starterEntriesAudited} entries across 65 decks. This audit distinguishes source preservation from cards actually loaded and certified in the runtime. All authoritative starter cards are now loaded into the live runtime. Remaining pages are classified by behavioural certification rather than catalogue presence.</p><div class="resultStats"><div><b>${e.exact_certified||0}</b><span>starter entries exact</span></div><div><b>${e.runtime_interpreted||0}</b><span>starter entries interpreted</span></div><div><b>${e.source_preserved_not_loaded||0}</b><span>not runtime-loaded</span></div><div><b>${r.uniqueSourceCardsUsedByStarters}</b><span>unique source cards</span></div></div><h2>Highest-priority remaining pages</h2><div class="library">${r.highestPriorityRemaining.slice(0,40).map(x=>`<article class="card ${['disabled','source_preserved_not_loaded','unresolved_source'].includes(x.status)?'unsupported':''}"><div class="cardhead"><h3>${esc(x.name)}</h3><span class="tag">${x.starterEntries} starter entries</span></div><p>${esc(x.text)}</p><div class="stats"><span>${esc(x.status.replaceAll('_',' '))}</span><span>${esc(x.sourceFile)}</span></div></article>`).join('')}</div></section>`
}

async function showBehaviourAudit(){const r=await fetch('data/behaviour-verification-v0929.json').then(x=>x.json());app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>BEHAVIOUR AUDIT</b><span>${r.superstarsAudited}</span></div><div class="resultStats"><div><b>${r.hpCorrections}</b><span>HP corrected</span></div><div><b>${r.exactAbilitiesEnabled}</b><span>Exact abilities</span></div><div><b>${r.abilitiesHeldBack}</b><span>Abilities held back</span></div><div><b>${r.startersChecked}</b><span>Starters checked</span></div></div><p class="instruction">Invented style-based Superstar powers have been removed. Unsupported abilities remain visible but disabled until their original timing, targeting and choices are reproduced exactly.</p><div class="library">${r.superstars.map(s=>`<article class="card"><div class="cardhead"><h3>${esc(s.name)}</h3><span class="tag">${s.originalHp} HP</span></div><p>${esc(s.sourceFile)}</p><div class="stats"><span>${s.abilityRuntime.replaceAll('_',' ')}</span><span>${s.corrected?'HP corrected':'HP verified'}</span></div></article>`).join('')}</div></section>`}


async function showSuperstarCertification(){const r=await fetch('data/superstar-ability-certification-v0945.json').then(x=>x.json());app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>SUPERSTAR ABILITY CERTIFICATION</b><span>${r.superstarsAudited}</span></div><div class="resultStats"><div><b>${r.callableImplemented}</b><span>callable abilities</span></div><div><b>${r.passivesImplemented}</b><span>passives active</span></div><div><b>${r.remaining}</b><span>still pending</span></div><div><b>${r.hpCorrections}</b><span>data corrections</span></div></div><div class="library">${r.superstars.map(x=>`<article class="card"><div class="cardhead"><h3>${esc(x.name)}</h3><span class="tag">${x.status}</span></div><p>${esc(x.ability)}</p><div class="stats"><span>${x.hp} HP</span><span>${esc(x.sourceFile)}</span></div></article>`).join('')}</div></section>`}


async function showOriginalTutorials(){
 const r=await fetch('data/original-offline-tutorials.json').then(x=>x.json());
 app.innerHTML=`<section class="screen rulesGuide"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>ORIGINAL OFFLINE TUTORIALS</b><span>${esc(r.version)}</span></div>
 <p class="instruction">${esc(r.source)}</p>
 <div class="rulesSections">${r.tutorials.map(t=>`<details open><summary>${esc(t.title)} · ${t.steps.length} steps</summary>${t.steps.map((s,i)=>{const parts=s.split('|');return `<article class="ruleItem"><b>${i+1}. ${esc(parts[0]||t.title)}</b><p>${esc(parts.slice(1).join(' ')||parts[0])}</p><small>${esc(t.sourceFile)}</small></article>`}).join('')}</details>`).join('')}</div>
 <h2>Original Practice Resource</h2><article class="mission"><h2>${esc(r.practiceDeck.title)}</h2><p>Exact deck resource recovered from ${esc(r.practiceDeck.sourceFile)}.</p><div class="stats"><span>${r.practiceDeck.pageCount} pages</span><span>Superstar ID ${r.practiceDeck.superstarPageId}</span></div><p><b>Fixed opening IDs:</b> ${r.practiceDeck.fixedOpeningAfterSuperstar.join(', ')}</p></article>
 <h2>New Player Guide Extracts</h2><div class="library">${r.newPlayerGuideExtracts.map(x=>`<article class="card"><p>${esc(x)}</p></article>`).join('')}</div>
 <h2>Intentionally Excluded</h2><div class="library">${r.excluded.map(x=>`<article class="card unsupported"><div class="cardhead"><h3>${esc(x.title)}</h3><span class="tag">EXCLUDED</span></div><p>${esc(x.reason)}</p><small>${esc(x.sourceFile)}</small></article>`).join('')}</div></section>`;
}


/* v0.9.55 consolidated mobile UI and opponent-selection repair */
function enterGameFromLogin(){
  if(window.__waEnteringGame)return;
  window.__waEnteringGame=true;
  try{
    unlockAudio();
    if(profile.firstLaunch){profile.firstLaunch=false;saveProfile()}
    home();
  }catch(err){
    console.error('Unable to enter game',err);
    window.__waEnteringGame=false;
    alert(`The main menu could not open: ${err.message||err}`);
  }
}
function showLoginScreen(){
  stopCrowd();stopMusic();
  window.__waEnteringGame=false;
  app.innerHTML=`<section class="loginScreen" aria-label="With Authority Mobile launch screen"><div class="launchPosterStage"><img class="launchPoster" src="assets/gai/LaunchPoster-v0972.png" alt="With Authority Mobile"><button id="loginPlay" class="posterPlayButton" type="button" aria-label="Play With Authority Mobile" onclick="enterGameFromLogin()"><span class="srOnly">Play</span></button><div class="loginVersion">${VERSION}</div></div></section>`;
}
function cleanEditionLabel(s){
  const t=String((s&&((s.title||'')+' '+(s.sourceFile||'')+' '+(s.id||'')))||'').toUpperCase();
  if(/UNFORGIVEN/.test(t))return'Unforgiven';
  if(/NO ?WAY ?OUT|NWO/.test(t))return'No Way Out';
  if(/TLC/.test(t))return'TLC';
  if(/X8/.test(t))return'WrestleMania X8';
  if(/SS2002|SUMMERSLAM/.test(t))return'SummerSlam 2002';
  if(/LIMITED|\bLE\b/.test(t))return'Limited Edition';
  if(/2E|SECOND/.test(t))return'Second Edition';
  if(/EX\d/.test(t))return'Expansion';
  return'First Edition';
}
function starterSuperKey(st){
  const direct=Object.entries(STARTER_MAP||{}).find(([,id])=>id===st.id);if(direct)return direct[0];
  const n=String((st.title||'')+' '+(st.description||'')+' '+(st.id||'')).toLowerCase().replace(/[^a-z0-9]+/g,'');
  const aliases={austin:['stonecold','steveaustin','austin'],rock:['therock','rockstarter'],tripleh:['tripleh'],undertaker:['undertaker'],kane:['kanestarter'],angle:['kurtangle','angle'],jericho:['chrisjericho','jericho'],benoit:['chrisbenoit','benoit'],bigshow:['bigshow'],bookert:['bookert'],edge:['edgestarter'],christian:['christian'],eddie:['eddieguerrero','eddie'],rvd:['robvandam','rvd'],flair:['ricflair','flair'],hogan:['hollywoodhogan','hulkhogan','hogan'],nash:['kev in nash'.replace(/ /g,''),'kevinnash','nash'],jeffhardy:['jeffhardy'],matthardy:['matthardy'],lita:['litastarter'],trish:['trishstratus','trish'],bubba:['bubbaray','bubba'],dvon:['dvondudley','dvon'],spike:['spikedudley','spike'],bradshaw:['bradshaw'],goldust:['goldust'],lancestorm:['lancestorm'],rikishi:['rikishiphatu','rikishi'],scotty:['scotty2hotty','scotty'],tajiri:['tajiri'],tazz:['tazz'],test:['teststarter'],hurricane:['thehurricane','hurricane'],regal:['williamregal','regal'],xpac:['xpac']};
  for(const [k,list] of Object.entries(aliases))if(list.some(a=>n.includes(a)))return k;
  return null;
}
function starterSuperstarCard(st){
  for(const entry of st?.entries||[]){
    const c=entry.cardId?cardById(entry.cardId):null;
    if(c?.cardClass==='Superstar')return c;
  }
  return null;
}
function starterEditionArt(st){
  const c=starterSuperstarCard(st);
  if(c){const exact=cardArt(c);if(exact)return exact}
  const key=starterSuperKey(st);
  return key?starArt(key):'';
}
function cleanStarterTitle(st){
  let t=String(st?.title||st?.id||'Authentic Starter').trim();
  t=t.replace(/[\/#%&]+\s*$/g,'').replace(/(STARTER)\d+$/i,'$1').replace(/\s{2,}/g,' ').trim();
  return t;
}
function starterEditionCardLabel(st){
  const c=starterSuperstarCard(st);
  return c?`${c.name} · ${c.originalSet||c.variantEdition||cleanEditionLabel(st)}`:cleanEditionLabel(st);
}
function superstarLimitRows(s){
  const icons={Agility:MOMENTUM_ICON_FILES.Agility,Knowledge:MOMENTUM_ICON_FILES.Knowledge,Strength:MOMENTUM_ICON_FILES.Strength,Strike:MOMENTUM_ICON_FILES.Strike,Technical:MOMENTUM_ICON_FILES.Technical};
  return Object.entries(s.momentumMaximums||{}).filter(([,v])=>Number(v)>=0).map(([type,v])=>`<span class="superLimit"><img src="./${icons[type]}" alt="${esc(type)}"><b>= ${v}</b></span>`).join('');
}
function entityTile(s,actions='',extra=''){
  const title=s.displayName||s.name,edition=s.edition?`<small class="editionName">${esc(s.edition)}</small>`:'';
  const abilityHtml=esc(s.abilityText||s.ability).split('\n').join('<br>');
  return `<article class="entityCard flipEntity" data-flip-entity data-entity-search="${esc([title,s.edition,s.baseKey&&SUPERSTARS[s.baseKey]?.name,s.style].filter(Boolean).join(' ').toLowerCase())}" data-super-key="${esc(s.key)}"><div class="entityFlipInner"><div class="entityFace entityFront">${artImg(starArt(s.key),'entityPortrait fullEntityArt',title)}<div class="entityFrontTitle"><h3>${esc(title)}</h3>${edition}<small>Tap to flip</small></div></div><div class="entityFace entityBack originalSuperBack"><div class="superBackHeader"><h3>${esc(title)}</h3>${edition}</div><div class="superBackStats"><div class="superLimits"><b>LIMITS</b>${superstarLimitRows(s)}</div><div class="superHp"><small>HP</small><b>${s.hp}</b></div></div><div class="superAbilityText">${abilityHtml}</div>${extra?`<div class="superDeckMeta">${extra}</div>`:''}<div class="entityActions compactEntityActions">${actions}</div><small class="flipHint">Tap card to flip back</small></div></div></article>`;
}
function attachEntityCardGestures(){
  document.querySelectorAll('[data-flip-entity]').forEach(card=>{
    card.addEventListener('click',e=>{if(e.target.closest('button,a,input,select,textarea'))return;card.classList.toggle('flipped')});
  });
  document.querySelectorAll('[data-open-playbook]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();deckBuilder(btn.dataset.openPlaybook)}));
}
function attachEntitySearch(){
  const input=document.getElementById('entitySearch');
  if(!input)return;
  const apply=()=>filterEntityGrid(input.value);
  input.addEventListener('input',apply);
  input.addEventListener('search',apply);
  input.addEventListener('keyup',apply);
  apply();
}

function characterSelectTools(placeholder='Search Superstars...'){
  return `<div class="characterSelectTools"><input id="entitySearch" class="search" placeholder="${esc(placeholder)}"><div class="sortControl"><button id="entitySortButton" class="secondary sortButton" type="button" aria-haspopup="true" aria-expanded="false">Sort</button><div id="entitySortMenu" class="sortMenu" hidden><button type="button" data-entity-sort="importance">WWE importance</button><button type="button" data-entity-sort="alphabetical">Alphabetical</button><button type="button" data-entity-sort="set">Set</button><button type="button" data-entity-sort="release-newest">Release: newest first</button><button type="button" data-entity-sort="release-oldest">Release: oldest first</button><button type="button" data-entity-sort="hp-high">HP: highest first</button><button type="button" data-entity-sort="hp-low">HP: lowest first</button></div></div></div>`;
}
function attachEntitySort(){
  const button=document.getElementById('entitySortButton'),menu=document.getElementById('entitySortMenu'),grid=document.getElementById('entityGrid');
  if(!button||!menu||!grid)return;
  const close=()=>{menu.hidden=true;button.setAttribute('aria-expanded','false')};
  button.addEventListener('click',e=>{e.stopPropagation();menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',String(!menu.hidden))});
  menu.querySelectorAll('[data-entity-sort]').forEach(option=>option.addEventListener('click',()=>{
    const mode=option.dataset.entitySort;
    const cards=[...grid.querySelectorAll('[data-super-key]')];
    cards.sort((a,b)=>compareSuperstars(SUPERSTARS[a.dataset.superKey],SUPERSTARS[b.dataset.superKey],mode));
    cards.forEach(card=>grid.appendChild(card));
    button.textContent=option.textContent;
    close();
  }));
  document.addEventListener('click',e=>{if(!e.target.closest('.sortControl'))close()});
}

function home(){
  ensureProfile();state=null;stopCrowd();if(AUDIO.unlocked&&profile.settings.music&&!AUDIO.music)playMusic('AppBackground',{loop:true,volume:.32});
  const r=recordFor(selectedSuperstar),star=SUPERSTARS[selectedSuperstar];
  app.innerHTML=`<section class="screen home originalHome"><div class="homeBrandPanel originalMenuHeader"><img class="waBrandLogo" src="assets/gai/b-WWFWithAuthority.webp" alt="WWF With Authority!"><div class="brandRule"></div><div class="sub"><b>${VERSION}</b> · LEVEL ${1+Math.floor(profile.xp/100)} · ${profile.xp} XP · ${profile.credits} credits<br>${profile.wins||0} wins · ${profile.losses||0} losses · ${esc(star.name)} ${r.wins}-${r.losses}</div></div>
  <div class="waMenuShell">
    <section class="waMenuGroup"><h2>PLAY</h2><div class="waMenuGrid"><button class="primary menuHero" onclick="superstarSelect()">Exhibition Match</button><button class="primary" onclick="practiceMenu()">Missions & Practice</button></div></section>
    <section class="waMenuGroup"><h2>PLAYBOOKS & COLLECTION</h2><div class="waMenuGrid"><button class="secondary" onclick="playbookHub()">Playbook Manager</button><button class="secondary" onclick="starterDeckBrowser()">Authentic Starter Decks</button><button class="secondary" onclick="showCards()">Card Collection</button><button class="secondary" onclick="boosterHub()">Booster Packs</button><button class="secondary" onclick="setBrowser()">Sets & Expansions</button></div></section>
    <section class="waMenuGroup"><h2>RECORDS</h2><div class="waMenuGrid"><button class="secondary" onclick="showRosterStats()">Superstar Records</button><button class="secondary" onclick="showMatchHistory()">Match History</button></div></section>
    <section class="waMenuGroup"><h2>HELP & OPTIONS</h2><div class="waMenuGrid"><button class="secondary" onclick="showOriginalTutorials()">Tutorials</button><button class="secondary" onclick="showOriginalRules()">Rules Guide</button><button class="secondary" onclick="settingsMenu()">Settings & Saves</button><button class="secondary" onclick="about()">About</button><button class="secondary developerEntry" onclick="preservationLab()">Preservation Lab</button></div></section>
  </div></section>`;
}
function playbookHub(){
  const tiles=selectableSuperstars().map(s=>entityTile(s,`<button class="primary compact" type="button" data-open-playbook="${s.key}">Open Playbook</button>`,`<p>${deckIds(s.key).length} pages · ${esc(s.style.toUpperCase())}</p>`)).join('');
  app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>PLAYBOOK MANAGER</b><span>${VERSION}</span></div><p class="instruction">Tap a Superstar card to flip it. Open Playbook is on the information side.</p>${characterSelectTools('Search Superstars...')}<div id="entityGrid" class="entityGrid">${tiles}</div></section>`;
  attachEntityCardGestures();
  attachEntitySearch();
  attachEntitySort();
}
function superstarSelect(){
  const tiles=selectableSuperstars().map(s=>{const d=starterStatus(s.key);return entityTile(s,`<button class="primary compact" data-select-super="${s.key}" ${d.ready?'':'disabled'}>${d.ready?(d.starter?.starterType==='official-product-build'?'Select Product Build':'Select'):'Incomplete'}</button><button class="secondary compact" onclick="starterDeckDetail('${esc(STARTER_MAP[s.key]||'')}')">Inspect</button>`,`<p><b>${d.mapped}/${d.total} starter pages ready</b></p>`)}).join('');
  app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>SELECT SUPERSTAR</b><span>${VERSION}</span></div>${characterSelectTools('Search Superstars...')}<div id="entityGrid" class="entityGrid">${tiles}</div></section>`;
  document.querySelectorAll('[data-select-super]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();chooseSuperstar(btn.dataset.selectSuper)}));
  attachEntityCardGestures();
  attachEntitySearch();
  attachEntitySort();
}


function ensureUnlockedRecommendations(){
  AI_DECKS.decks=AI_DECKS.decks||[];
  const existing=new Set(AI_DECKS.decks.filter(d=>d.unlockedTestDeck).map(d=>d.superstar));
  for(const star of selectableSuperstars()){
    if(existing.has(star.key))continue;
    const base=star.baseKey||star.key;
    const candidates=AI_DECKS.decks.filter(d=>d.superstar===base&&!d.starterUpgrade&&!/showcase/i.test(String(d.strategy||d.name||'')));
    let source=candidates[0];
    if(!source){
      const ids=defaultDeckIds(star.key).slice(0,80);
      if(ids.length<55)continue;
      source={id:`${base}-starter-source`,name:`${SUPERSTARS[star.key].name} Starter Core`,strategy:'Starter-based full access recommendation',methods:[],deckIds:ids,leadOff:ids.slice(0,5),size:ids.length};
    }
    const valid=source.deckIds.filter(id=>{const c=cardById(id);return c&&c.cardClass!=='Superstar'&&!c.unplayable}).slice(0,80);
    if(valid.length<55)continue;
    AI_DECKS.decks.unshift({...source,id:`${star.key}-unlocked-ai`,superstar:star.key,name:`${SUPERSTARS[star.key].name} — Unlocked AI Recommended`,strategy:`Fully unlocked test build based on ${source.finisherName||source.name}`,deckIds:valid,leadOff:(source.leadOff||valid.slice(0,5)).filter(id=>valid.includes(id)).slice(0,5),size:valid.length,unlockedTestDeck:true,targetCollection:'Full authentic card pool',rating:{tier:'Unlocked',score:100},validation:{...(source.validation||{}),allCardsAvailable:true,sourceRecommendationId:source.id}});
  }
  AI_DECKS.unlockedRecommendations=AI_DECKS.decks.filter(d=>d.unlockedTestDeck).length;
}

function ownedCopiesFor(key){ensureRewardProfile();const counts={};const starter=starterForKey(key);for(const e of starter?.entries||[])if(e.cardId)counts[e.cardId]=(counts[e.cardId]||0)+1;for(const [id,n] of Object.entries(profile.collection||{}))counts[id]=(counts[id]||0)+Number(n||0);return counts}
function ownedRecommendedIds(rec){const owned=ownedCopiesFor(rec.superstar),used={},result=[];for(const id of rec.deckIds){if((used[id]||0)<(owned[id]||0)){result.push(id);used[id]=(used[id]||0)+1}}const starter=defaultDeckIds(rec.superstar);for(const id of starter){if(result.length>=55)break;if((used[id]||0)<(owned[id]||0)){result.push(id);used[id]=(used[id]||0)+1}}return result.slice(0,80)}
function selectStarterDeck(){selectedDeckMode='starter';selectedRecommendedDeck=null;opponentSelect()}
function selectCustomDeck(){if(!profile.decks?.[selectedSuperstar]?.length)return deckBuilder(selectedSuperstar);selectedDeckMode='custom';selectedRecommendedDeck=null;opponentSelect()}
function selectRecommendedDeck(id){const rec=(AI_DECKS.decks||[]).find(x=>x.id===id);if(!rec)return;if(rec.unlockedTestDeck){selectedDeckMode='ai';selectedRecommendedDeck={...rec,deckIds:[...rec.deckIds],size:rec.deckIds.length};return opponentSelect()}const owned=ownedRecommendedIds(rec);if(owned.length<55){alert(`You currently own ${owned.length} of the pages needed for a legal version of this recommendation. Open boosters or use the Starter Deck.`);return}selectedDeckMode='ai';selectedRecommendedDeck={...rec,deckIds:owned,size:owned.length};opponentSelect()}
function inspectRecommendedDeck(id){const rec=(AI_DECKS.decks||[]).find(x=>x.id===id);if(!rec)return;const owned=rec.unlockedTestDeck?rec.deckIds:ownedRecommendedIds(rec),counts={};for(const id of rec.deckIds)counts[id]=(counts[id]||0)+1;app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="deckChoiceScreen('${rec.superstar}')">Back</button><b>${esc(rec.name)}</b><span>${rec.size} pages</span></div><p class="instruction">${esc(rec.strategy)} · ${esc((rec.methods||[]).join(' / '))}. ${rec.unlockedTestDeck?'All required pages are unlocked for immediate testing.':`Complete Collection target: ${rec.size} pages. You can currently assemble ${owned.length} pages from your Starter Deck and booster collection.`} Tap any page to flip it.</p><div class="library originalCardLibrary">${Object.entries(counts).map(([id,n])=>{const c=cardById(id);return c?staticOriginalCardHtml(c,`×${n}`):''}).join('')}</div></section>`}
function deckChoiceScreen(key){
 selectedSuperstar=key;
 selectedDeckMode='starter';
 selectedRecommendedDeck=null;
 const st=starterStatus(key);
 if(key==='austin'){
   app.innerHTML=`<section class="screen originalPanelScreen"><div class="topbar"><button class="secondary compact" onclick="superstarSelect()">Back</button><b>STONE COLD STEVE AUSTIN</b><span>${st.total} PAGES</span></div><div class="deckChoiceGrid starterOnlyGrid"><article class="deckChoiceCard starterChoice">${artImg(starArt(key),'entityPortrait',SUPERSTARS[key].name)}<h2>STONE COLD'S DECK</h2><button class="primary compact" type="button" onclick="selectStarterDeck()" ${st.ready?'':'disabled'}>CONTINUE</button></article></div></section>`;
   return;
 }
 app.innerHTML=`<section class="screen originalPanelScreen"><div class="topbar"><button class="secondary compact" onclick="superstarSelect()">Back</button><b>AUTHENTIC STARTER</b><span>${esc(SUPERSTARS[key].name)}</span></div><div class="deckChoiceGrid starterOnlyGrid"><article class="deckChoiceCard starterChoice">${artImg(starArt(key),'entityPortrait',SUPERSTARS[key].name)}<h2>AUTHENTIC STARTER</h2><p>${st.starter?.starterType==='official-product-build'?'Historically grounded Official Product Build. Not a recovered original starter.':'Exact recovered starter with its original Lead Off five and untouched card order.'}</p><p><b>${st.mapped}/${st.total}</b> pages resolved</p><button class="primary compact" type="button" onclick="selectStarterDeck()" ${st.ready?'':'disabled'}>USE STARTER</button></article></div></section>`;
}

function opponentSelect(){
  const options=selectableSuperstars().filter(s=>s.key!==selectedSuperstar);
  const ready=options.filter(s=>starterStatus(s.key).ready);
  const tiles=options.map(s=>{
    const d=starterStatus(s.key);
    return entityTile(
      s,
      `<button class="secondary compact" type="button" data-opponent="${s.key}" ${d.ready?'':'disabled'}>${d.ready?'Choose Opponent':'Incomplete'}</button>`,
      `<p>${s.hp} HP · ${esc(s.style.toUpperCase())}</p><p class="abilityLine">${esc(s.ability)}</p><p>${d.mapped}/${d.total} starter pages ready</p>`
    );
  }).join('');
  app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" type="button" onclick="deckChoiceScreen('${selectedSuperstar}')">Back</button><b>SELECT OPPONENT</b><span>${esc(SUPERSTARS[selectedSuperstar].name)}</span></div><div class="menu opponentQuick"><button id="randomOpponentButton" class="primary" type="button" ${ready.length?'':'disabled'}>Random Ready Opponent</button></div>${characterSelectTools('Search opponents...')}<div id="entityGrid" class="entityGrid">${tiles}</div></section>`;
  document.getElementById('randomOpponentButton')?.addEventListener('click',randomOpponent);
  document.querySelectorAll('[data-opponent]').forEach(btn=>btn.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    selectOpponentAndStart(btn.dataset.opponent);
  }));
  attachEntityCardGestures();
  attachEntitySearch();
  attachEntitySort();
}

function selectOpponentAndStart(key){
  const status=starterStatus(key);if(!status.ready){alert('That deck is not ready.');return}
  selectedOpponent=key;
  selectedMatchTurnLimit=DEFAULT_MATCH_TURN_LIMIT;
  matchOptionsScreen();
}
function adjustMatchTurnLimit(direction){
  const delta=(Number(direction)||0)*MATCH_TURN_LIMIT_STEP;
  selectedMatchTurnLimit=Math.max(MIN_MATCH_TURN_LIMIT,Math.min(MAX_MATCH_TURN_LIMIT,selectedMatchTurnLimit+delta));
  matchOptionsScreen();
}
function matchOptionsScreen(){
  const player=SUPERSTARS[selectedSuperstar],opponent=SUPERSTARS[selectedOpponent];
  if(!player||!opponent)return opponentSelect();
  app.innerHTML=`<section class="screen originalPanelScreen matchOptionsScreen"><div class="topbar"><button class="secondary compact" type="button" onclick="opponentSelect()">Back</button><b>MATCH OPTIONS</b><span>STANDARD MATCH</span></div><div class="matchupPreview"><article class="matchupWrestler">${artImg(starArt(selectedSuperstar),'entityPortrait',player.name)}<h2>${esc(player.name)}</h2><span>PLAYER</span></article><strong class="versusMark">VS</strong><article class="matchupWrestler">${artImg(starArt(selectedOpponent),'entityPortrait',opponent.name)}<h2>${esc(opponent.name)}</h2><span>OPPONENT</span></article></div><article class="matchOptionPanel"><div><h2>TURN LIMIT</h2><p>The match ends by decision if no winner is produced by this turn.</p></div><div class="turnLimitControl"><button class="secondary limitButton" type="button" onclick="adjustMatchTurnLimit(-1)" ${selectedMatchTurnLimit<=MIN_MATCH_TURN_LIMIT?'disabled':''} aria-label="Reduce turn limit">−</button><div class="turnLimitValue"><b>${selectedMatchTurnLimit}</b><span>TURNS</span></div><button class="secondary limitButton" type="button" onclick="adjustMatchTurnLimit(1)" ${selectedMatchTurnLimit>=MAX_MATCH_TURN_LIMIT?'disabled':''} aria-label="Increase turn limit">+</button></div><small>Minimum ${MIN_MATCH_TURN_LIMIT} · Maximum ${MAX_MATCH_TURN_LIMIT} · Changes by ${MATCH_TURN_LIMIT_STEP}</small></article><article class="futureMatchTypes"><b>MATCH TYPE</b><span>Standard</span><small>Hardcore, Steel Cage, Ladder and other match types will be added here later.</small></article><button class="primary startMatchButton" type="button" onclick="confirmMatchOptions()">START MATCH</button></section>`;
}
function confirmMatchOptions(){
  try{start()}catch(err){console.error(err);alert(`The match could not start: ${err.message||err}`)}
}
function setOpponent(key){selectOpponentAndStart(key)}
function filterEntityGrid(value){const q=String(value??document.getElementById('entitySearch')?.value??'').trim().toLowerCase();document.querySelectorAll('#entityGrid .entityCard').forEach(card=>{const hay=String(card.dataset.entitySearch||card.textContent||'').toLowerCase();card.hidden=!!q&&!hay.includes(q)})}


function showMatchHistory(){ensureProfile();app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>MATCH HISTORY</b><span>${profile.matchHistory.length}</span></div><div class="history">${profile.matchHistory.length?profile.matchHistory.map(h=>`<article><b class="${h.win?'win':'loss'}">${h.win?'WIN':'LOSS'}</b><h3>${esc(h.player)} vs ${esc(h.cpu)}</h3><p>${esc(h.reason)} · ${h.rounds} rounds</p><small>${esc(h.date)}</small></article>`).join(''):'<p class="instruction">No completed matches yet.</p>'}</div></section>`}
function settingsMenu(){ensureProfile();app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>SETTINGS & SAVES</b><span>${VERSION}</span></div><div class="settings"><label><span>Sound effects</span><input type="checkbox" ${profile.settings.sound?'checked':''} onchange="toggleSetting('sound',this.checked)"></label><label><span>Music</span><input type="checkbox" ${profile.settings.music?'checked':''} onchange="toggleSetting('music',this.checked);this.checked?playMusic('AppBackground',{loop:true,volume:.32}):stopMusic()"></label><label><span>Music volume</span><input type="range" min="0" max="1" step="0.1" value="${profile.settings.musicVolume??1}" onchange="toggleSetting('musicVolume',Number(this.value));if(AUDIO.music)AUDIO.music.volume=.32*Number(this.value)"></label><label><span>Effects volume</span><input type="range" min="0" max="1" step="0.1" value="${profile.settings.sfxVolume??1}" onchange="toggleSetting('sfxVolume',Number(this.value))"></label><label><span>Animations</span><input type="checkbox" ${profile.settings.animations?'checked':''} onchange="toggleSetting('animations',this.checked)"></label><label><span>Confirm reset</span><input type="checkbox" ${profile.settings.confirmReset?'checked':''} onchange="toggleSetting('confirmReset',this.checked)"></label><button class="secondary" onclick="exportSave()">Export Save</button><label class="secondary importBtn">Import Save<input type="file" accept="application/json" onchange="importSave(this.files[0])"></label><button class="secondary" onclick="restoreBackupSave()">Restore Previous Local Save</button><button class="secondary" onclick="showSystemDiagnostics()">System Diagnostics</button><button class="secondary" onclick="showAutomatedCertification()">Automated Certification</button><button class="danger" onclick="resetProgress()">Reset All Progress</button></div></section>`}
function toggleSetting(k,v){profile.settings[k]=v;saveProfile()}
function exportSave(){const blob=new Blob([JSON.stringify(profile,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='with-authority-mobile-save-v0990.json';a.click();URL.revokeObjectURL(a.href)}
function importSave(file){if(!file)return;const r=new FileReader();r.onload=()=>{try{const parsed=JSON.parse(r.result);if(!parsed||typeof parsed!=='object')throw Error();profile=parsed;ensureProfile();saveProfile();alert('Save imported successfully.');home()}catch{alert('That save file could not be imported.')}};r.readAsText(file)}
function resetProgress(){if(profile.settings.confirmReset&&!confirm('Reset all With Authority Mobile progress on this device?'))return;localStorage.removeItem(STORE);localStorage.removeItem(BACKUP_STORE);profile={decks:{},wins:0,losses:0,stats:{},credits:0,xp:0,matchHistory:[],missions:{},firstLaunch:true,settings:{sound:true,music:true,musicVolume:1,sfxVolume:1,animations:true,confirmReset:true},collection:{},unopenedPacks:[],openedPacks:0};home()}
function toggleMatchMenu(){if(!state)return;state.matchMenuOpen=!state.matchMenuOpen;render()}
function closeMatchMenu(){if(!state)return;state.matchMenuOpen=false;render()}
function quitCurrentMatch(){if(!state)return home();if(confirm('Quit this match and return to the main menu?')){state=null;stopCrowd();stopMusic();home()}}
function matchMenu(){if(!state?.matchMenuOpen)return'';return `<div class="matchMenuOverlay" role="dialog" aria-modal="true"><div class="matchMenuPanel"><h2>MATCH OPTIONS</h2><button class="primary" onclick="closeMatchMenu()">Resume</button><button class="secondary" onclick="toggleSetting('sound',!profile.settings.sound);render()">Sound Effects: ${profile.settings.sound?'On':'Off'}</button><button class="secondary" onclick="toggleSetting('music',!profile.settings.music);profile.settings.music?playMusic('AppBackground',{loop:true,volume:.32}):stopMusic();render()">Music: ${profile.settings.music?'On':'Off'}</button><button class="danger" onclick="quitCurrentMatch()">Quit Match</button></div></div>`}
function about(){app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>ABOUT</b><span>${VERSION}</span></div><div class="waInfoPanel"><img class="waBrandLogo" src="assets/gai/b-WWFWithAuthority.webp" alt="With Authority!"><h2>With Authority Mobile</h2><p>An offline mobile recreation and preservation project based on the original WWF With Authority! card game.</p><p>Authentic Superstar editions, starter decks, card artwork, rules, booster products and recovered audio are preserved wherever source data is available.</p><p>Progress is stored on this device. Use Settings & Saves to export a backup.</p><button class="primary" onclick="home()">Main Menu</button></div></section>`}

async function showAutomatedCertification(){
  let report=null;
  try{report=await fetch('./data/automated-certification-v0992.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()})}catch(err){app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="preservationLab()">Back</button><b>AUTOMATED CERTIFICATION</b><span>${VERSION}</span></div><div class="waInfoPanel"><p>Certification report could not be loaded.</p><p>${esc(err.message)}</p></div></section>`;return}
  const summary=report.summary||{};
  const rows=(report.checks||[]).map(c=>`<article class="certCheck cert-${esc(c.status)}"><div class="cardhead"><h3>${esc(c.category)} · ${esc(c.name)}</h3><span class="tag">${esc(String(c.status).toUpperCase())}</span></div><p>${esc(c.detail||'')}</p></article>`).join('');
  app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="preservationLab()">Back</button><b>AUTOMATED CERTIFICATION</b><span>${VERSION}</span></div><div class="waInfoPanel"><h2>${esc(report.overall||'REPORT')}</h2><p><b>${summary.pass||0}</b> passed · <b>${summary.warn||0}</b> warnings · <b>${summary.fail||0}</b> failures</p><p>${report.scope?.cards||0} cards · ${report.scope?.starters||0} starter/product builds · ${report.scope?.unlockedRecommendations||0} unlocked recommendations · ${report.scope?.images||0} images</p><p class="muted">Static/data certification does not replace the listed browser and iPhone scenarios.</p></div><div class="certGrid">${rows}</div><section class="waMenuGroup"><h2>DEVICE SCENARIOS STILL REQUIRED</h2><div class="waInfoPanel">${(report.nextBrowserScenarios||[]).map(x=>`<p>• ${esc(x)}</p>`).join('')}</div></section></section>`
}
function preservationLab(){app.innerHTML=`<section class="screen"><div class="topbar"><button class="secondary compact" onclick="home()">Back</button><b>PRESERVATION LAB</b><span>${VERSION}</span></div><p class="instruction">Technical source material and recovery tools are kept separate from normal play.</p><div class="waMenuShell"><section class="waMenuGroup"><h2>RECOVERED SOURCE MATERIAL</h2><div class="waMenuGrid"><button class="secondary" onclick="showOriginalCampaign()">Campaign Source Files</button><button class="secondary" onclick="showOriginalRules()">Original Rules Guide</button><button class="secondary" onclick="showOriginalTutorials()">Original Tutorials</button><button class="secondary" onclick="setBrowser()">Card Sets & Variants</button><button class="secondary" onclick="showSystemDiagnostics()">System Diagnostics</button><button class="secondary" onclick="showAutomatedCertification()">Automated Certification</button></div></section><section class="waMenuGroup"><h2>BUILD INFORMATION</h2><div class="waInfoPanel"><p><b>Runtime cards:</b> ${cards.length}</p><p><b>Selectable Superstar versions:</b> ${selectableSuperstars().length}</p><p><b>Recovered starter packages:</b> ${(STARTERS.starters||[]).length}</p><p>Historical audit files remain in the project archive but are not shown in the main player menu.</p></div></section></div></section>`}



window.__WA_TEST__={
  getState:()=>state,
  inspect:()=>state?{ended:!!state.ended,round:state.round,control:state.control,position:state.position,hold:state.hold?{attacker:state.hold.attacker,defender:state.hold.defender,card:state.hold.card?.name,turns:state.hold.turns}:null,player:{hp:state.player.hp,momentum:{...state.player.momentum},hand:state.player.hand.map(c=>c.name),deck:state.player.deck.map(c=>c.name),discard:state.player.discard.map(c=>c.name),stun:state.player.stun},cpu:{hp:state.cpu.hp,momentum:{...state.cpu.momentum},hand:state.cpu.hand.map(c=>c.name),deck:state.cpu.deck.map(c=>c.name),discard:state.cpu.discard.map(c=>c.name),stun:state.cpu.stun},log:[...state.log]}:null,
  cardByName:name=>cards.find(c=>c.name===name),
  setState:value=>{state=value;return state},
  createSide,
  resolveCard,
  applySuccessfulAttack,
  resolveMomentum,
  drawPages,
  end,
  cpuTurn,
  legalReason,
  isMovePage,
  beginTurn,
  attemptPin,
  maintainSubmission,
  releaseSubmission
};
