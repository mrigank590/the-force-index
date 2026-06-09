import { useState } from "react";

/* ─────────────────────────────────────────────
   THEME TOKENS
   dark  = space / night side
   light = Tatooine / desert / parchment
───────────────────────────────────────────── */
const themes = {
  dark: {
    bg:            "#07070f",
    surface:       "#0f0f1e",
    surfaceAlt:    "#0a0a18",
    border:        "#252540",
    borderHover:   "#3a3a60",
    textPrimary:   "#f0ece4",
    textSecondary: "#c8c0b0",
    textMuted:     "#8880a0",
    textFaint:     "#6860808",
    accent:        "#FFD700",
    accentGlow:    "rgba(255,215,0,0.35)",
    green:         "#4ED88A",
    greenDim:      "#3ab870",
    red:           "#FF5555",
    redDim:        "#cc4444",
    orange:        "#FF8C42",
    headerBg:      "linear-gradient(180deg,#000 0%,#070715 100%)",
    tabActive:     { bg: "#FFD700", color: "#000" },
    tabInactive:   { bg: "transparent", color: "#FFD700", border: "#FFD700" },
    cardBg:        "#0f0f1e",
    sectionDiv:    "#1a1a30",
    noteText:      "#ccc5b8",
    prosText:      "#7dd9a0",
    consText:      "#e89898",
    negText:       "#d4a0a0",
    footerText:    "#706888",
    starfield:     true,
  },
  light: {
    bg:            "#f2e8d0",
    surface:       "#eddfc0",
    surfaceAlt:    "#e6d5a8",
    border:        "#b8a870",
    borderHover:   "#8a7040",
    textPrimary:   "#140e04",
    textSecondary: "#2c2210",
    textMuted:     "#3e2e10",   // darkened — was #6b5530, now passes 7:1 on all surfaces
    textFaint:     "#5a4420",   // darkened — was #8b7050
    accent:        "#9a4800",   // deeper burnt sienna for stronger contrast
    accentGlow:    "rgba(154,72,0,0.25)",
    green:         "#0f4e22",   // darker green for light bg
    greenDim:      "#1a6630",
    red:           "#6e0c0c",   // darker red for light bg
    redDim:        "#8b1010",
    orange:        "#8a3800",
    headerBg:      "linear-gradient(180deg,#b07808 0%,#d4a820 50%,#f2e8d0 100%)",
    tabActive:     { bg: "#9a4800", color: "#fff" },
    tabInactive:   { bg: "transparent", color: "#9a4800", border: "#9a4800" },
    cardBg:        "#eddfc0",
    sectionDiv:    "#caba80",
    noteText:      "#2c2210",
    prosText:      "#0f4e22",
    consText:      "#6e0c0c",
    negText:       "#5c2008",
    footerText:    "#4a3618",   // darkened — was #8b7050
    badgeAlpha:    "28",        // slightly stronger tint for verdict badges in light mode
    starfield:     false,
  }
};

const verdictColors = (t) => ({
  "WATCH":                               t === "dark" ? "#4ED88A" : "#0f4e22",
  "FANEDIT STRONGLY RECOMMENDED":        t === "dark" ? "#FF5555" : "#6e0c0c",
  "FANEDIT RECOMMENDED":                 t === "dark" ? "#FF8C42" : "#8a3800",
  "WATCH (Fanedit Optional)":            t === "dark" ? "#FFD700" : "#7a5400",
  "OPTIONAL":                            t === "dark" ? "#7070a0" : "#3e3010",
  "WATCH (With Managed Expectations)":   t === "dark" ? "#FFD700" : "#7a5400",
  "WATCH (After Rebels)":                t === "dark" ? "#4ED88A" : "#0f4e22",
  "WATCH (Selective Order)":             t === "dark" ? "#FFD700" : "#7a5400",
  "WATCH (After OT)":                    t === "dark" ? "#4ED88A" : "#0f4e22",
  "WATCH (Right Before Ep IV)":          t === "dark" ? "#4ED88A" : "#0f4e22",
  "WATCH (Short — Only ~4hrs total)":    t === "dark" ? "#4ED88A" : "#0f4e22",
  "WATCH S1 & S2 / S3 Optional":         t === "dark" ? "#4ED88A" : "#0f4e22",
  "WATCH — Critically Acclaimed":        t === "dark" ? "#4ED88A" : "#0f4e22",
  "PARTIAL — Episodes 5 & 6 Only":       t === "dark" ? "#FFD700" : "#7a5400",
  "SKIP / LOW PRIORITY":                 t === "dark" ? "#504860" : "#3e3010",
  "WATCH (Recommended for Clone fans)":  t === "dark" ? "#60b8ff" : "#0a3070",
});

const data = {
  orders: [
    {
      step: 1, phase: "ORIGINAL TRILOGY",
      label: "Start Here — The Foundation",
      color: { dark: "#FFD700", light: "#9a4800" },
      entries: [
        {
          title: "Episode IV – A New Hope", year: 1977, type: "Movie", verdict: "WATCH",
          fanedit: { name: "Harmy's Despecialized Edition v2.7", by: "Harmy (Petr Harmáček)", why: "Restores the original 1977 theatrical cut in HD — removes George Lucas's contentious 1997/2004 Special Edition changes (Han Shot First, CGI Jabba scene, Greedo changes). Widely considered the gold standard OT preservation.", pros: ["Restores Han shooting first — makes his character arc make sense", "Removes jarring late-90s CGI additions", "Fixes color grading altered in Blu-ray releases", "Regarded by academics as a cultural preservation effort"], cons: ["Quality stitched from multiple sources — some scenes look slightly inconsistent", "Artificial sharpening causes minor distortion in some shots", "Not commercially available — requires torrent/fan community", "Technically a legal grey area"], rating: "⭐⭐⭐⭐⭐ — Fanedit.org, TechRadar, academic endorsement" },
          negatives: ["Pacing slow compared to modern blockbusters", "Dated practical effects (though many prefer this)", "Exposition-heavy opening"],
          notes: "Watch this first. This is the movie that started everything — Luke, Han, Leia, Vader, the Death Star."
        },
        {
          title: "Episode V – The Empire Strikes Back", year: 1980, type: "Movie", verdict: "WATCH",
          fanedit: { name: "Harmy's Despecialized (ESB) OR Adywan's 'Revisited'", by: "Harmy / Adywan", why: "Same preservation goals as ANH. Adywan's 'Revisited' keeps some SE improvements while reverting the most hated changes and adds tasteful new VFX. The community is split between the two.", pros: ["Adywan's version includes subtle new VFX that feel period-appropriate", "Both versions remove Vader's infamous 'NOOOO' re-dub added in 2004 Blu-ray"], cons: ["Adywan's ESB Revisited — finding a complete up-to-date version can be tricky", "Harmy's ESB slightly lower quality than ANH Despecialized due to source limitations"], rating: "⭐⭐⭐⭐⭐ — Universally praised as the best film in the saga" },
          negatives: ["Ends on a cliffhanger — not a complete story on its own", "Some find Yoda scenes slow (though most love them)"],
          notes: "Contains THE twist. Arguably the best Star Wars film ever made."
        },
        {
          title: "Episode VI – Return of the Jedi", year: 1983, type: "Movie", verdict: "WATCH",
          fanedit: { name: "Harmy's Despecialized (ROTJ) OR Spence's Edit", by: "Harmy / Spence", why: "Removes added Naboo/Coruscant celebration footage from Special Edition, restores the original Ewok Celebration song, and reverts the controversial Hayden Christensen ghost replacement.", pros: ["Original Ewok song restored (most fans strongly prefer it)", "Original Sebastian Shaw ghost restored as Anakin", "Removes weirdly inserted SE dancing aliens"], cons: ["Spence's edit also cuts some Ewok scenes many fans enjoy", "Harmy ROTJ is the weakest of the three in source quality"], rating: "⭐⭐⭐⭐ — Community split on Ewoks but edit quality praised" },
          negatives: ["Ewoks are divisive — some find them too cutesy", "Sarlacc sequences feel slow to modern audiences", "Resolution feels rushed compared to ESB's buildup"],
          notes: "Completes the Luke/Vader arc. Stop after this before the next phase."
        }
      ]
    },
    {
      step: 2, phase: "PREQUEL TRILOGY (as Flashback)",
      label: "Watch AFTER the OT — Preserves the Vader Reveal",
      color: { dark: "#FF8C42", light: "#8a3800" },
      entries: [
        {
          title: "Episode I – The Phantom Menace", year: 1999, type: "Movie", verdict: "FANEDIT STRONGLY RECOMMENDED",
          fanedit: { name: "L8wrtr's 'Shadow of the Sith' OR HAL9000's Edit", by: "L8wrtr / HAL 9000", why: "The Phantom Menace is widely considered the weakest Star Wars film. L8wrtr's edit significantly tightens pacing, reduces Jar Jar Binks, removes the midichlorians scene, and makes Anakin more compelling.", pros: ["Jar Jar Binks reduced to near-irrelevance", "Midichlorian dialogue cut", "Tighter pacing — removes pod racing padding", "Better tone alignment with OT", "KU film scholar endorses L8wrtr's trilogy edits for tone consistency"], cons: ["Still can't fix: Anakin is a child, making later romance awkward", "Some iconic scenes (Duel of the Fates) are trimmed", "Machete Order purists skip this entirely — it's optional"], rating: "⭐⭐⭐⭐ fanedit / ⭐⭐ theatrical" },
          negatives: ["Broadly panned on release", "Jar Jar Binks universally criticized", "Child actor performance considered weak", "Midichlorians retconned the mystical Force", "Simon Pegg famously called it a 'betrayal'", "Machete Order skips this — genuinely optional"],
          notes: "⚠️ Optional per Machete Order. If you watch it, use the fanedit. The Duel of the Fates lightsaber battle is genuinely great."
        },
        {
          title: "Episode II – Attack of the Clones", year: 2002, type: "Movie", verdict: "FANEDIT STRONGLY RECOMMENDED",
          fanedit: { name: "L8wrtr's 'The Republic Divided'", by: "L8wrtr", why: "Cuts most of the widely mocked Anakin/Padmé romance dialogue ('I hate sand'), tightens the investigation plot, and improves the tone to feel closer to the original trilogy.", pros: ["Removes 'I hate sand' speech", "Love story feels less awkward", "Better pacing overall", "Character motivations feel more earned"], cons: ["Anakin's romance is still rushed by nature of the story", "Some important lore setup gets cut", "Jango Fett's role is reduced"], rating: "⭐⭐⭐⭐ fanedit / ⭐⭐ theatrical" },
          negatives: ["Anakin/Padmé romance considered one of the worst in mainstream cinema", "'I hate sand' became a meme for a reason", "Didn't crack the top 3 box office of its year", "CGI has not aged well"],
          notes: "The romance is rough but sets up Ep. III. Fanedit makes this watchable."
        },
        {
          title: "Episode III – Revenge of the Sith", year: 2005, type: "Movie", verdict: "FANEDIT RECOMMENDED",
          fanedit: { name: "L8wrtr's 'Dawn of the Empire'", by: "L8wrtr / HAL9000", why: "Provides a more emotionally earned Anakin fall, cuts Vader's 'NOOOOO' scream, and improves Padmé's agency. In HAL9000's version she survives to bring baby Leia to Alderaan.", pros: ["Vader's 'NOOOO' scream removed", "Anakin's fall feels more tragic and believable", "Padmé feels less passive", "HAL9000: Padmé survives and holds baby Leia — genuinely emotional"], cons: ["Can't remove the inherent pacing issue of Anakin's quick turn", "Order 66 sequence unchanged — still brutal (some consider this a feature)", "HAL9000 vs L8wrtr is a genuine debate"], rating: "⭐⭐⭐⭐⭐ theatrical is already the best prequel / fanedit makes it even better" },
          negatives: ["Anakin's turn to evil happens very fast", "Padmé dying of 'a broken heart' is medically nonsensical", "Some meme-worthy dialogue remains"],
          notes: "The best prequel by far — even in theatrical form. Anakin's fall is genuinely heartbreaking here."
        }
      ]
    },
    {
      step: 3, phase: "ANIMATED SERIES",
      label: "Essential Lore — Fills Major Gaps",
      color: { dark: "#60b8ff", light: "#0a3070" },
      entries: [
        {
          title: "The Clone Wars – Seasons 1–7", year: "2008–2020", type: "Animated (7 Seasons)", verdict: "WATCH (Selective Order)",
          fanedit: { name: "Eddie Dean's 'Focused' Cut OR Galadantien's Movie Cuts", by: "Eddie Dean / Galadantien", why: "The full series is 133 episodes. Fan-cut versions condense the most critical arcs into movie-length features. However, the Siege of Mandalore (Season 7 finale) is considered must-watch in full.", pros: ["Movie cuts give you the core Ahsoka, Maul, and Anakin story in manageable chunks", "Skips filler episodes rated low by community", "Ahsoka's arc in S7 best experienced in full"], cons: ["Some argue the full series is worth the investment", "Movie cuts may remove side characters who appear in Rebels and Ahsoka", "Quality varies wildly between arcs — early seasons are noticeably weaker"], rating: "⭐⭐⭐⭐⭐ key arcs / ⭐⭐⭐ early filler seasons" },
          negatives: ["First 1–2 seasons are considered weak and childish", "Animation quality starts rough then improves dramatically", "Some arcs feel disconnected", "133 episodes is a huge time investment", "2008 movie pilot rated very low"],
          notes: "Skip Season 1–2 filler and the 2008 movie. The Siege of Mandalore (S7 Ep 9–12) is some of the best Star Wars ever made."
        },
        {
          title: "Star Wars Rebels – Seasons 1–4", year: "2014–2018", type: "Animated (4 Seasons)", verdict: "WATCH (After OT)",
          fanedit: { name: "No major fanedit needed — watch as-is", by: "N/A", why: "", pros: ["Well-paced 4-season run", "Strong character arcs that pay off in live-action shows"], cons: ["Season 1 is noticeably more childish than later seasons"], rating: "⭐⭐⭐⭐ — Community ranks it #5 overall in the franchise" },
          negatives: ["Season 1 is noticeably more childish than later seasons", "Some CGI hasn't aged well", "Ezra is divisive as a protagonist early on"],
          notes: "Set between Ep III and Ep IV. Characters appear in The Mandalorian and Ahsoka — important for Disney+ continuity."
        },
        {
          title: "The Bad Batch – Seasons 1–3", year: "2021–2024", type: "Animated (3 Seasons)", verdict: "OPTIONAL",
          fanedit: { name: "No major fanedit needed", by: "N/A", why: "", pros: ["Excellent production quality", "Good character development"], cons: ["Side story — not essential to main saga"], rating: "⭐⭐⭐⭐ — Won 3 Saturn Awards" },
          negatives: ["Side story — not essential to main saga", "Some arcs drag in Season 2", "Won't be missed if skipped for first watch"],
          notes: "Set right after Ep III. Clone-focused. Can be watched after completing the main saga."
        },
        {
          title: "Tales of the Jedi / Tales of the Empire", year: "2022–2024", type: "Animated Anthology", verdict: "WATCH (Short — Only ~4hrs total)",
          fanedit: { name: "No fanedit needed — anthology format", by: "N/A", why: "", pros: ["Short time investment", "High quality shorts"], cons: ["Some episodes more interesting than others"], rating: "⭐⭐⭐⭐ — Short and high quality" },
          negatives: ["Some episodes more interesting than others", "Assumes familiarity with Clone Wars/Rebels"],
          notes: "Short anthology format. Tales of the Jedi explores Ahsoka and Dooku. Watch after Clone Wars."
        }
      ]
    },
    {
      step: 4, phase: "STANDALONE FILMS",
      label: "Side Stories — Can Slot In Anywhere",
      color: { dark: "#b060ff", light: "#5010a0" },
      entries: [
        {
          title: "Rogue One: A Star Wars Story", year: 2016, type: "Movie", verdict: "WATCH (Right Before Ep IV)",
          fanedit: { name: "No major fanedit needed", by: "N/A", why: "", pros: ["Strong standalone story", "Best Vader scene in modern SW", "Gritty war tone"], cons: ["No major improvements needed"], rating: "⭐⭐⭐⭐ — Community ranks it #6 overall" },
          negatives: ["CGI resurrection of Peter Cushing as Moff Tarkin is controversial/unsettling", "Most main characters are new with little setup time", "Ending is bittersweet — all heroes die"],
          notes: "Direct prequel to A New Hope. Watch it right before Ep IV for maximum Vader corridor payoff."
        },
        {
          title: "Solo: A Star Wars Story", year: 2018, type: "Movie", verdict: "OPTIONAL",
          fanedit: { name: "HAL9000's Solo Edit", by: "HAL 9000", why: "Minor pacing improvements, removes some awkward humour.", pros: ["Tightens pacing", "Removes some weak jokes"], cons: ["Doesn't fundamentally change the film"], rating: "⭐⭐⭐ theatrical / ⭐⭐⭐ fanedit" },
          negatives: ["Bombed at the box office — many boycotted due to Disney fatigue", "Alden Ehrenreich as young Han is divisive", "Han's backstory was more interesting as mystery", "Maul cameo feels shoehorned without Clone Wars context", "Community ranks it low (#12 of all SW content)"],
          notes: "Fun but non-essential. Save for after your first full saga watch. Watch Clone Wars first for the Maul cameo."
        }
      ]
    },
    {
      step: 5, phase: "SEQUEL TRILOGY",
      label: "Most Controversial Era — Fanedit Heavily Recommended",
      color: { dark: "#FF5555", light: "#6e0c0c" },
      entries: [
        {
          title: "Episode VII – The Force Awakens", year: 2015, type: "Movie", verdict: "WATCH (Fanedit Optional)",
          fanedit: { name: "HAL9000's 'The Force Awakens: Restructured'", by: "HAL 9000", why: "Tightens the film and removes some redundancies. Theatrical is still watchable though — it's the most positively received sequel.", pros: ["Tightened pacing", "Some scenes reordered for better flow", "HAL9000 is respected for professional-level work"], cons: ["Film has structural issues (copying A New Hope) that editing can't fix", "Starkiller Base is still a rehashed Death Star"], rating: "⭐⭐⭐⭐ theatrical / fanedit community split" },
          negatives: ["Widely criticized as a remake of A New Hope rather than a new story", "Starkiller Base is a third Death Star with no new ideas", "Han Solo's death feels cheap to many", "Sets up plotlines that Ep VIII ignores entirely"],
          notes: "Fun and entertaining despite criticisms. Rey and Finn are likeable. Carries strong nostalgia weight."
        },
        {
          title: "Episode VIII – The Last Jedi", year: 2017, type: "Movie", verdict: "FANEDIT STRONGLY RECOMMENDED",
          fanedit: { name: "HAL9000's 'The Last Jedi: Legendary'", by: "HAL 9000 / DonKamillo", why: "Removes the Canto Bight casino subplot (which most critics agree adds nothing), tightens Holdo's arc, and removes tonal inconsistencies (iron scene).", pros: ["Removes Canto Bight entirely — widely celebrated by community", "Holdo/Poe conflict feels more coherent", "Iron/humor scene at opening removed — better tone", "Film becomes much more focused"], cons: ["Without Canto Bight, Rose Tico has almost no role", "Core decisions (Luke's portrayal, Snoke's death) remain unchanged", "Can't fix the trilogy-level planning problem"], rating: "⭐⭐⭐ theatrical / ⭐⭐⭐⭐ fanedit" },
          negatives: ["Most divisive SW film ever — fandom literally split", "Ignores nearly every setup from Ep VII", "Canto Bight casino arc almost universally called padding", "Luke's characterization upsets many long-time fans", "Ranked #17 out of 21 in Steam community poll"],
          notes: "Contains genuinely great moments (Holdo maneuver, throne room fight) buried in a messy structure. Fanedit is transformative here."
        },
        {
          title: "Episode IX – The Rise of Skywalker", year: 2019, type: "Movie", verdict: "FANEDIT STRONGLY RECOMMENDED",
          fanedit: { name: "HAL9000's 'Ascendant' OR Wakeupkeo's 'An Old Fear'", by: "HAL 9000 / Wakeupkeo", why: "Removes the infamous 'Somehow Palpatine returned' cold open, restructures scenes, adds force ghosts visually to the final battle. Wakeupkeo's 'An Old Fear' is the fanedit.org community's top recommended sequel edit.", pros: ["'Somehow Palpatine returned' line softened/removed", "Force ghosts appear visually in final battle", "Better pacing — removes frantic chase scenes", "Wakeupkeo's version praised as making the movie emotionally resonant"], cons: ["Can't fix the core writing problem: Palpatine's return is unexplained", "Rey Palpatine twist remains — highly controversial", "Missing middle chapter setup can't be created"], rating: "⭐⭐ theatrical / ⭐⭐⭐ fanedit" },
          negatives: ["'Somehow Palpatine returned' with zero buildup is widely mocked", "Undoes almost everything TLJ set up — trilogy contradicts itself", "Rey Palpatine retcon is divisive", "Ranked #16 in Steam poll"],
          notes: "The weakest entry in the Skywalker Saga. Use a fanedit. Despite flaws, it brings some emotional closure."
        }
      ]
    },
    {
      step: 6, phase: "DISNEY+ LIVE-ACTION SHOWS",
      label: "Post-Saga Stories — Quality Varies Wildly",
      color: { dark: "#4ED88A", light: "#0f4e22" },
      entries: [
        {
          title: "Andor – Season 1 & 2", year: "2022–2025", type: "Live-Action Series", verdict: "WATCH — Critically Acclaimed",
          fanedit: { name: "No fanedit needed", by: "N/A", why: "", pros: ["Grounded political thriller tone", "Best writing in Disney-era SW"], cons: ["Slow burn — first 3 episodes are setup-heavy"], rating: "⭐⭐⭐⭐⭐ — Consistently called best Disney SW show" },
          negatives: ["Very slow first 3 episodes — some drop off before it picks up", "Tone is deliberately un-Star-Wars-y which bothers some fans", "Season 2 confirmed as the final season"],
          notes: "Set before Rogue One. Many consider this the best writing in all of Star Wars. Watch after Rogue One."
        },
        {
          title: "The Mandalorian – Seasons 1–3", year: "2019–2023", type: "Live-Action Series", verdict: "WATCH S1 & S2 / S3 Optional",
          fanedit: { name: "No major fanedit for S1–2", by: "N/A", why: "", pros: ["S1 and S2 excellent standalone episodes", "Grogu is universally beloved"], cons: ["S3 is widely considered weaker"], rating: "⭐⭐⭐⭐⭐ S1–S2 / ⭐⭐⭐ S3" },
          negatives: ["Season 3 considered a significant quality drop", "Book of Boba Fett crossover episodes required mid-Mando S3 — disrupts flow", "Some episodic filler across all seasons"],
          notes: "S1 and S2 are genuinely excellent. S3 stumbles. The Mandalorian & Grogu film is in theaters May 2026."
        },
        {
          title: "The Book of Boba Fett", year: "2021–2022", type: "Live-Action Series", verdict: "PARTIAL — Episodes 5 & 6 Only",
          fanedit: { name: "Community: skip to Ep 5–6 only", by: "N/A", why: "", pros: ["Ep 5–6 are high quality Mando content"], cons: ["Rest of the series is widely considered weak"], rating: "⭐⭐ overall / ⭐⭐⭐⭐ Ep 5–6" },
          negatives: ["Main plot widely criticized as bland", "Boba Fett's characterization is divisive", "Community ranks it #14 of all SW content"],
          notes: "Skip the main story, watch episodes 5 and 6 (Mando episodes) before Mando Season 3."
        },
        {
          title: "Obi-Wan Kenobi", year: 2022, type: "Live-Action Series", verdict: "WATCH (With Managed Expectations)",
          fanedit: { name: "HAL9000's Film Edit", by: "HAL 9000", why: "Condenses the series into a film, cuts the weakest episode, better overall pacing.", pros: ["Film format removes weakest episode", "Ewan McGregor and Hayden Christensen are excellent"], cons: ["Story still has plot holes regardless of edit"], rating: "⭐⭐⭐ theatrical / ⭐⭐⭐⭐ as film edit" },
          negatives: ["Reva's plan has major plot holes", "Some episodes feel like filler", "Continuity issues with existing canon", "Community ranks it #13"],
          notes: "Worth watching for Ewan McGregor's performance alone. The HAL9000 film edit is the recommended way to watch."
        },
        {
          title: "Ahsoka – Season 1", year: 2023, type: "Live-Action Series", verdict: "WATCH (After Rebels)",
          fanedit: { name: "No major fanedit yet", by: "N/A", why: "", pros: ["Direct sequel to Rebels", "Excellent Ahsoka characterization"], cons: ["Requires Rebels knowledge — confusing otherwise"], rating: "⭐⭐⭐⭐ — Strong for Rebels fans" },
          negatives: ["Almost incomprehensible without watching Rebels first", "Pacing slows significantly mid-season", "Season 2 has been delayed multiple times"],
          notes: "Watch Rebels first — otherwise major character relationships make no sense."
        },
        {
          title: "The Acolyte – Season 1", year: 2024, type: "Live-Action Series", verdict: "SKIP / LOW PRIORITY",
          fanedit: { name: "N/A — cancelled", by: "N/A", why: "", pros: ["Interesting High Republic setting"], cons: ["Cancelled — no resolution"], rating: "⭐⭐ — Cancelled, lore controversy" },
          negatives: ["Cancelled after Season 1 — no narrative resolution", "Controversial lore choices breaking established canon", "Low audience reception", "Near-unanimous bottom ranking in community polls"],
          notes: "Cancelled with no resolution. Low priority for first-time viewers."
        }
      ]
    }
  ],
  watchOrder: [
    { n:1,  title:"Episode IV – A New Hope",            edit:"Harmy's Despecialized v2.7" },
    { n:2,  title:"Episode V – Empire Strikes Back",    edit:"Harmy's Despecialized / Adywan's Revisited" },
    { n:3,  title:"Episode VI – Return of the Jedi",    edit:"Harmy's Despecialized / Spence's Edit" },
    { n:4,  title:"Episode I – Phantom Menace",         edit:"L8wrtr's Shadow of the Sith (Optional)" },
    { n:5,  title:"Episode II – Attack of the Clones",  edit:"L8wrtr's The Republic Divided" },
    { n:6,  title:"The Clone Wars (Key Arcs)",          edit:"Eddie Dean's Focused Cut" },
    { n:7,  title:"Episode III – Revenge of the Sith",  edit:"L8wrtr's Dawn of the Empire" },
    { n:8,  title:"Tales of the Jedi",                  edit:"Theatrical" },
    { n:9,  title:"Andor – Season 1",                   edit:"Theatrical" },
    { n:10, title:"Rogue One",                          edit:"Theatrical" },
    { n:11, title:"Star Wars Rebels – Seasons 1–4",     edit:"Theatrical" },
    { n:12, title:"The Mandalorian – Seasons 1–2",      edit:"Theatrical" },
    { n:13, title:"Book of Boba Fett – Ep 5 & 6 only", edit:"Skip the rest" },
    { n:14, title:"The Mandalorian – Season 3",         edit:"Theatrical (Optional)" },
    { n:15, title:"Ahsoka – Season 1",                  edit:"Theatrical (after Rebels)" },
    { n:16, title:"Episode VII – The Force Awakens",    edit:"HAL9000's Restructured (Optional)" },
    { n:17, title:"Episode VIII – The Last Jedi",       edit:"HAL9000's Legendary Edit" },
    { n:18, title:"Episode IX – Rise of Skywalker",     edit:"HAL9000 Ascendant / Wakeupkeo's An Old Fear" },
    { n:19, title:"Obi-Wan Kenobi",                     edit:"HAL9000 Film Edit" },
    { n:20, title:"Solo: A Star Wars Story",             edit:"Theatrical (Optional)" },
    { n:21, title:"Andor – Season 2",                   edit:"Theatrical" },
  ],
  fanedits: [
    { film:"Ep IV – A New Hope",             editor:"Harmy",             name:"Despecialized Edition v2.7",       tier:"Essential",       desc:"Restores the 1977 theatrical cut in HD. Removes Special Edition CGI additions. Gold standard OT preservation." },
    { film:"Ep V – Empire Strikes Back",     editor:"Harmy / Adywan",    name:"Despecialized / Revisited",        tier:"Essential",       desc:"Harmy restores theatrical. Adywan adds tasteful new VFX. Community split — both excellent." },
    { film:"Ep VI – Return of the Jedi",     editor:"Harmy / Spence",    name:"Despecialized / Spence's Edit",    tier:"Essential",       desc:"Restores original Ewok song, original Anakin ghost. Removes SE additions." },
    { film:"Ep I – Phantom Menace",          editor:"L8wrtr",            name:"Shadow of the Sith",               tier:"Strongly Rec.",   desc:"Reduces Jar Jar, cuts midichlorians, tightens pacing, better tone alignment with OT." },
    { film:"Ep II – Attack of the Clones",   editor:"L8wrtr",            name:"The Republic Divided",             tier:"Strongly Rec.",   desc:"Cuts 'I hate sand', fixes romance pacing, reduces cringe factor significantly." },
    { film:"Ep VIII – The Last Jedi",        editor:"HAL 9000",          name:"The Last Jedi: Legendary",         tier:"Strongly Rec.",   desc:"Removes entire Canto Bight subplot. Tightens Holdo arc. Removes opening iron scene." },
    { film:"Ep IX – Rise of Skywalker",      editor:"HAL9000 / Wakeupkeo", name:"Ascendant / An Old Fear",        tier:"Strongly Rec.",   desc:"Removes 'Somehow Palpatine returned'. Adds force ghosts visually to final battle." },
    { film:"Ep III – Revenge of the Sith",   editor:"L8wrtr / HAL9000",  name:"Dawn of the Empire",               tier:"Recommended",     desc:"Removes Vader NOOO scream. HAL9000 version: Padmé survives to bring baby Leia to Alderaan." },
    { film:"Obi-Wan Kenobi",                 editor:"HAL 9000",          name:"Film Edit",                        tier:"Recommended",     desc:"Condenses series into a film, cuts weakest episode, better pacing." },
    { film:"Ep VII – The Force Awakens",     editor:"HAL 9000",          name:"Force Awakens: Restructured",      tier:"Optional",        desc:"Minor pacing improvements. Theatrical is watchable — this is a polish job." },
    { film:"The Clone Wars",                 editor:"Eddie Dean",         name:"Focused Cut",                      tier:"Optional",        desc:"Condenses 133 episodes into key story arcs. Good for first-timers who want the story without filler." },
  ]
};

const tierStyle = (tier, th, mode) => {
  if (tier === "Essential")      return { bg: th.accent,  text: mode === "light" ? "#fff" : th.bg };
  if (tier === "Strongly Rec.")  return { bg: th.red,     text: "#fff" };
  if (tier === "Recommended")    return { bg: th.orange,  text: "#fff" };
  // Optional — use a readable dark-on-mid combo in both modes
  return mode === "light"
    ? { bg: "#c8b870", text: "#1a1208" }
    : { bg: th.border,  text: "#c0b8d8" };
};

export default function StarWarsGuide() {
  const [mode, setMode]       = useState("dark");
  const [tab, setTab]         = useState("guide");
  const [open, setOpen]       = useState({});
  const th = themes[mode];
  const vColors = verdictColors(mode);
  const toggle = k => setOpen(p => ({ ...p, [k]: !p[k] }));

  const noEditNames = new Set(["No major fanedit needed","No fanedit needed","No major fanedit — watch as-is","N/A — cancelled","N/A",""]);

  return (
    <div style={{ margin:0, padding:0, background: th.bg, color: th.textPrimary, fontFamily:"'Courier New',Courier,monospace", minHeight:"100vh", paddingBottom:"60px" }}>

      {/* ── HEADER ── */}
      <div style={{ background: th.headerBg, borderBottom: `2px solid ${th.accent}`, padding:"40px 24px 28px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        {mode === "dark" && (
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 70% 15%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 45% 60%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 85% 70%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.3) 0%, transparent 100%)", pointerEvents:"none" }} />
        )}
        {mode === "light" && (
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,200,50,0.3) 0%, transparent 70%)", pointerEvents:"none" }} />
        )}

        {/* theme toggle */}
        <button onClick={() => setMode(m => m === "dark" ? "light" : "dark")} style={{ position:"absolute", top:"16px", right:"16px", background: th.surface, border:`1px solid ${th.border}`, color: th.textPrimary, padding:"6px 14px", fontFamily:"inherit", fontSize:"11px", letterSpacing:"1px", cursor:"pointer" }}>
          {mode === "dark" ? "☀ TATOOINE MODE" : "✦ SPACE MODE"}
        </button>

        <div style={{ fontSize:"10px", letterSpacing:"6px", color: th.accent, marginBottom:"8px" }}>A LONG TIME AGO IN A GALAXY FAR, FAR AWAY...</div>
        <h1 style={{ fontSize:"clamp(24px,5vw,44px)", fontFamily:"Georgia,serif", color: th.accent, letterSpacing:"4px", textShadow:`0 0 28px ${th.accentGlow}`, margin:"0 0 6px 0" }}>STAR WARS</h1>
        <div style={{ fontSize:"clamp(11px,2vw,15px)", letterSpacing:"3px", color: th.textSecondary, marginBottom:"4px" }}>COMPLETE FIRST-TIMER'S GUIDE</div>
        <div style={{ fontSize:"11px", color: th.textMuted, letterSpacing:"2px" }}>FAN EDITS · COMMUNITY VERDICTS · HONEST NEGATIVES</div>

        <div style={{ marginTop:"24px", display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
          {[["guide","Full Guide"],["order","Watch Order"],["fanedits","Fan Edit Index"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ background: tab===id ? th.tabActive.bg : th.tabInactive.bg, color: tab===id ? th.tabActive.color : th.tabInactive.color, border: `1px solid ${th.accent}`, padding:"8px 20px", fontFamily:"inherit", fontSize:"11px", letterSpacing:"2px", cursor:"pointer", transition:"all 0.2s" }}>{label}</button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:"860px", margin:"0 auto", padding:"0 16px" }}>

        {/* WATCH ORDER */}
        {tab === "order" && (
          <div style={{ paddingTop:"32px" }}>
            <div style={{ textAlign:"center", marginBottom:"24px" }}>
              <div style={{ color: th.accent, fontSize:"11px", letterSpacing:"3px", marginBottom:"6px" }}>RECOMMENDED VIEWING SEQUENCE</div>
              <div style={{ color: th.textMuted, fontSize:"12px" }}>Modified Machete Order · Fan Edits Noted</div>
            </div>
            {data.watchOrder.map((item,i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"16px", padding:"12px 0", borderBottom:`1px solid ${th.sectionDiv}` }}>
                <div style={{ width:"32px", height:"32px", minWidth:"32px", border:`1px solid ${th.accent}`, display:"flex", alignItems:"center", justifyContent:"center", color: th.accent, fontSize:"12px", fontWeight:"bold", flexShrink:0 }}>{item.n}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"14px", color: th.textPrimary }}>{item.title}</div>
                  <div style={{ fontSize:"11px", color: th.textMuted, marginTop:"2px" }}>
                    {!item.edit.includes("Theatrical") && !item.edit.includes("Skip") ? "✂️ " : ""}{item.edit}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:"20px", padding:"16px", background: th.surface, border:`1px solid ${th.border}`, fontSize:"12px", color: th.textMuted, lineHeight:"1.8" }}>
              <div style={{ color: th.accent, marginBottom:"6px", letterSpacing:"2px", fontSize:"11px" }}>✂️ = FANEDIT RECOMMENDED</div>
              Fan edits are distributed as .xdelta patch files applied to official Blu-ray rips. Find them via fanedit.org forums or r/fanedits. Search the editor name to find guides.
            </div>
          </div>
        )}

        {/* FAN EDIT INDEX */}
        {tab === "fanedits" && (
          <div style={{ paddingTop:"32px" }}>
            <div style={{ textAlign:"center", marginBottom:"24px" }}>
              <div style={{ color: th.accent, fontSize:"11px", letterSpacing:"3px" }}>FAN EDIT DIRECTORY</div>
            </div>
            {data.fanedits.map((item,i) => {
              const ts = tierStyle(item.tier, th, mode);
              return (
                <div key={i} style={{ padding:"14px 16px", borderBottom:`1px solid ${th.sectionDiv}`, display:"flex", gap:"16px", alignItems:"flex-start" }}>
                  <div style={{ minWidth:"96px" }}>
                    <div style={{ fontSize:"10px", padding:"3px 8px", textAlign:"center", background: ts.bg, color: ts.text, letterSpacing:"1px" }}>{item.tier}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"12px", color: th.accent }}>{item.film}</div>
                    <div style={{ fontSize:"13px", color: th.textPrimary, marginTop:"2px" }}>{item.name}</div>
                    <div style={{ fontSize:"11px", color: th.textMuted, marginTop:"2px" }}>by {item.editor}</div>
                    <div style={{ fontSize:"12px", color: th.textSecondary, marginTop:"6px", lineHeight:"1.6" }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
            <div style={{ padding:"20px 16px", background: th.surface, border:`1px solid ${th.border}`, marginTop:"24px", fontSize:"12px", color: th.textMuted, lineHeight:"1.8" }}>
              <div style={{ color: th.accent, fontSize:"11px", letterSpacing:"2px", marginBottom:"8px" }}>HOW TO FIND FAN EDITS</div>
              Fan edits require owning the official Blu-ray. Patch files (.xdelta) are applied using xdelta3 software. The fanedit.org community has step-by-step guides for every major edit listed here. Search r/fanedits for the most current links.
            </div>
          </div>
        )}

        {/* MAIN GUIDE */}
        {tab === "guide" && data.orders.map((phase, pi) => {
          const phColor = phase.color[mode];
          return (
            <div key={pi} style={{ marginTop:"40px" }}>
              <div style={{ borderLeft:`3px solid ${phColor}`, paddingLeft:"16px", marginBottom:"10px" }}>
                <div style={{ fontSize:"10px", letterSpacing:"4px", color: phColor }}>PHASE {phase.step}</div>
                <div style={{ fontSize:"clamp(14px,3vw,20px)", fontFamily:"Georgia,serif", color: th.textPrimary, letterSpacing:"1px" }}>{phase.phase}</div>
                <div style={{ fontSize:"12px", color: th.textMuted, marginTop:"3px" }}>{phase.label}</div>
              </div>

              {phase.entries.map((entry, ei) => {
                const key = `${pi}-${ei}`;
                const isOpen = open[key];
                const vColor = vColors[entry.verdict] || th.textMuted;
                const showFanedit = entry.fanedit && !noEditNames.has(entry.fanedit.name);

                return (
                  <div key={ei} style={{ background: th.cardBg, border:`1px solid ${isOpen ? phColor : th.border}`, marginBottom:"8px", transition:"border-color 0.2s" }}>
                    <div onClick={() => toggle(key)} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
                      <div style={{ fontSize:"10px", padding:"3px 10px", background: vColor+(mode==="light" ? "20" : "22"), color: vColor, border:`1px solid ${vColor+(mode==="light" ? "88" : "66")}`, letterSpacing:"1px", whiteSpace:"nowrap", flexShrink:0 }}>{entry.verdict}</div>
                      <div style={{ flex:1, minWidth:"180px" }}>
                        <div style={{ fontSize:"14px", color: th.textPrimary, fontWeight:"600" }}>{entry.title}</div>
                        <div style={{ fontSize:"11px", color: th.textMuted, marginTop:"2px" }}>{entry.year} · {entry.type}</div>
                      </div>
                      <div style={{ color: isOpen ? phColor : th.textMuted, fontSize:"20px", flexShrink:0, lineHeight:1 }}>{isOpen ? "−" : "+"}</div>
                    </div>

                    {isOpen && (
                      <div style={{ padding:"0 16px 16px", borderTop:`1px solid ${th.sectionDiv}` }}>
                        {/* Notes */}
                        <div style={{ padding:"12px 0", fontSize:"13px", color: th.noteText, lineHeight:"1.75", borderBottom:`1px solid ${th.sectionDiv}` }}>
                          {entry.notes}
                        </div>

                        {/* Fan Edit */}
                        {showFanedit && (
                          <div style={{ marginTop:"14px", background: th.surfaceAlt, border:`1px solid ${th.borderHover}`, padding:"14px" }}>
                            <div style={{ fontSize:"10px", letterSpacing:"3px", color: th.accent, marginBottom:"8px" }}>✂️ FAN EDIT</div>
                            <div style={{ fontSize:"14px", color: th.accent, fontWeight:"600" }}>{entry.fanedit.name}</div>
                            <div style={{ fontSize:"11px", color: th.textMuted, marginBottom:"10px", marginTop:"2px" }}>by {entry.fanedit.by}</div>
                            <div style={{ fontSize:"13px", color: th.textSecondary, marginBottom:"12px", lineHeight:"1.65" }}>{entry.fanedit.why}</div>
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                              <div>
                                <div style={{ fontSize:"10px", letterSpacing:"2px", color: th.green, marginBottom:"8px" }}>PROS</div>
                                {entry.fanedit.pros.map((p,i) => (
                                  <div key={i} style={{ fontSize:"12px", color: th.prosText, marginBottom:"6px", lineHeight:"1.6" }}>+ {p}</div>
                                ))}
                              </div>
                              <div>
                                <div style={{ fontSize:"10px", letterSpacing:"2px", color: th.red, marginBottom:"8px" }}>CONS</div>
                                {entry.fanedit.cons.map((c,i) => (
                                  <div key={i} style={{ fontSize:"12px", color: th.consText, marginBottom:"6px", lineHeight:"1.6" }}>− {c}</div>
                                ))}
                              </div>
                            </div>
                            <div style={{ marginTop:"12px", fontSize:"12px", color: th.textMuted, borderTop:`1px solid ${th.border}`, paddingTop:"10px" }}>{entry.fanedit.rating}</div>
                          </div>
                        )}

                        {/* Negatives */}
                        <div style={{ marginTop:"14px" }}>
                          <div style={{ fontSize:"10px", letterSpacing:"3px", color: th.red, marginBottom:"8px" }}>⚠️ COMMUNITY NEGATIVES</div>
                          {entry.negatives.map((n,i) => (
                            <div key={i} style={{ fontSize:"12px", color: th.negText, marginBottom:"6px", lineHeight:"1.65" }}>• {n}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Footer */}
        <div style={{ marginTop:"48px", padding:"20px", borderTop:`1px solid ${th.border}`, fontSize:"11px", color: th.footerText, lineHeight:"2", textAlign:"center" }}>
          Sources: fanedit.org · r/fanedits · r/StarWars · KU Film Studies · TechRadar · GamesRadar · Steam Forums · Fanedit community consensus
        </div>
      </div>
    </div>
  );
}
