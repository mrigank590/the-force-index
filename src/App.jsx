import { useState } from "react";

const data = {
  intro: {
    title: "YOUR STAR WARS GUIDE",
    subtitle: "First-Time Viewer Edition · Fan Edits Included",
    note: "This guide uses the MODIFIED MACHETE ORDER — best for preserving the big Vader twist while giving you the full story. Fan edits are listed for each entry where relevant. Community negatives are called out honestly."
  },
  orders: [
    {
      step: 1,
      phase: "ORIGINAL TRILOGY",
      label: "Start Here — The Foundation",
      color: "#FFD700",
      entries: [
        {
          title: "Episode IV – A New Hope",
          year: 1977,
          type: "Movie",
          platform: "Disney+",
          verdict: "WATCH",
          fanedit: {
            name: "Harmy's Despecialized Edition v2.7",
            by: "Harmy (Petr Harmáček)",
            why: "Restores the original 1977 theatrical cut in HD — removes George Lucas's contentious 1997/2004 Special Edition changes (Han Shot First, CGI Jabba scene, Greedo changes). Widely considered the gold standard OT preservation.",
            pros: ["Restores Han shooting first — which makes his character arc make sense", "Removes jarring late-90s CGI additions", "Fixes color grading that was altered in Blu-ray releases", "Regarded by academics as a cultural preservation effort"],
            cons: ["Quality is stitched together from multiple sources — some scenes look slightly inconsistent", "Artificial sharpening causes minor distortion in some shots (e.g. opening title card letterforms)", "Not commercially available — requires finding via torrent/fan community", "Technically a legal grey area"],
            rating: "⭐⭐⭐⭐⭐ — Fanedit.org, TechRadar, academic endorsement"
          },
          negatives: ["Some find the pacing slow compared to modern blockbusters", "Dated practical effects (though many prefer this)", "Exposition-heavy opening"],
          notes: "Watch this first. This is the movie that started everything — Luke, Han, Leia, Vader, the Death Star."
        },
        {
          title: "Episode V – The Empire Strikes Back",
          year: 1980,
          type: "Movie",
          platform: "Disney+",
          verdict: "WATCH",
          fanedit: {
            name: "Harmy's Despecialized Edition (ESB) OR Adywan's 'Revisited'",
            by: "Harmy / Adywan",
            why: "Same preservation goals as ANH. Adywan's 'Revisited' is also acclaimed — it keeps some SE improvements while reverting the most hated changes and even adds tasteful new VFX. The community is split between the two.",
            pros: ["Adywan's version includes subtle new VFX that feel period-appropriate", "Both versions remove Vader's infamous 'NOOOO' re-dub added in 2004 Blu-ray"],
            cons: ["Adywan's ESB Revisited has been in development for years — finding a complete up-to-date version can be tricky", "Harmy's ESB is slightly lower quality than ANH Despecialized due to source limitations"],
            rating: "⭐⭐⭐⭐⭐ — Universally praised as the best film in the saga"
          },
          negatives: ["Ends on a cliffhanger — not a complete story on its own", "Some find Yoda scenes slow (though most love them)"],
          notes: "Contains THE twist. Arguably the best Star Wars film ever made."
        },
        {
          title: "Episode VI – Return of the Jedi",
          year: 1983,
          type: "Movie",
          platform: "Disney+",
          verdict: "WATCH",
          fanedit: {
            name: "Harmy's Despecialized Edition (ROTJ) OR Spence's Edit",
            by: "Harmy / Spence",
            why: "Removes added Naboo/Coruscant celebration footage from Special Edition and restores the original Ewok Celebration song. Also reverts the controversial Hayden Christensen ghost replacement.",
            pros: ["Original Ewok song restored (most fans strongly prefer it)", "Original Sebastian Shaw ghost restored as Anakin", "Removes weirdly inserted SE dancing aliens"],
            cons: ["Spence's edit also cuts some Ewok scenes many fans still enjoy", "Harmy ROTJ is the weakest of the three in terms of source quality"],
            rating: "⭐⭐⭐⭐ — Community split on Ewoks but edit quality praised"
          },
          negatives: ["Ewoks are divisive — some find them too cutesy", "Sarlacc sequences feel slow to modern audiences", "Resolution feels rushed compared to ESB's buildup"],
          notes: "Completes the Luke/Vader arc. Stop after this before the next phase."
        }
      ]
    },
    {
      step: 2,
      phase: "PREQUEL TRILOGY (as Flashback)",
      label: "Watch AFTER the OT — Preserves the Vader Reveal",
      color: "#FF6B35",
      entries: [
        {
          title: "Episode I – The Phantom Menace",
          year: 1999,
          type: "Movie",
          platform: "Disney+",
          verdict: "FANEDIT STRONGLY RECOMMENDED",
          fanedit: {
            name: "L8wrtr's 'Shadow of the Sith' OR HAL9000's Edit",
            by: "L8wrtr / HAL 9000",
            why: "The Phantom Menace is widely considered the weakest Star Wars film. L8wrtr's edit significantly tightens pacing, reduces Jar Jar Binks, removes the controversial midichlorians scene, and makes Anakin more compelling. HAL9000 takes a similar but more conservative approach.",
            pros: ["Jar Jar Binks reduced to near-irrelevance", "Midichlorian dialogue cut", "Tighter pacing — removes pod racing padding", "Better tone alignment with OT", "KU film scholar specifically endorses L8wrtr's trilogy edits for tone consistency"],
            cons: ["Still can't fix the core story problem: Anakin is a child, making later romance awkward", "Some iconic scenes (Duel of the Fates) are trimmed", "Machete Order purists skip this entirely — episode is largely optional"],
            rating: "⭐⭐⭐⭐ for fanedit / ⭐⭐ for theatrical"
          },
          negatives: ["Original film was broadly panned on release", "Jar Jar Binks universally criticized", "Child actor performance considered weak", "Midichlorians retconned the mystical Force in ways many disliked", "Simon Pegg famously called it a 'betrayal'", "Machete Order skips this entirely — it's genuinely optional"],
          notes: "⚠️ Optional per Machete Order. If you watch it, use the fanedit. The Duel of the Fates lightsaber battle is genuinely great."
        },
        {
          title: "Episode II – Attack of the Clones",
          year: 2002,
          type: "Movie",
          platform: "Disney+",
          verdict: "FANEDIT STRONGLY RECOMMENDED",
          fanedit: {
            name: "L8wrtr's 'The Republic Divided'",
            by: "L8wrtr",
            why: "Cuts most of the widely mocked Anakin/Padmé romance dialogue ('I hate sand'), tightens the investigation plot, and improves the tone to feel closer to the original trilogy.",
            pros: ["Removes cringeworthy 'I hate sand' speech", "Love story feels less awkward", "Better pacing overall", "Character motivations feel more earned"],
            cons: ["Can't fully fix the fundamental issue: Anakin's romance is still rushed by nature of the story", "Some important lore setup gets cut", "Jango Fett's role is reduced"],
            rating: "⭐⭐⭐⭐ for fanedit / ⭐⭐ for theatrical"
          },
          negatives: ["Anakin/Padmé romance considered one of the worst in mainstream cinema", "'I hate sand' speech became a meme for a reason", "Attack of the Clones didn't even crack the top 3 box office of its year", "CGI has not aged well in many scenes"],
          notes: "The romance is rough but sets up Ep. III. Fanedit makes this watchable."
        },
        {
          title: "Episode III – Revenge of the Sith",
          year: 2005,
          type: "Movie",
          platform: "Disney+",
          verdict: "FANEDIT RECOMMENDED",
          fanedit: {
            name: "L8wrtr's 'Dawn of the Empire'",
            by: "L8wrtr",
            why: "Completes L8wrtr's prequel trilogy. Provides a more emotionally earned Anakin fall, cuts Vader's 'NOOOOO' scream, and improves Padmé's agency in the story (in HAL9000's version she even survives to bring baby Leia to Alderaan).",
            pros: ["Vader's 'NOOOO' scream removed", "Anakin's fall feels more tragic and believable", "Padmé feels less passive", "HAL9000 version: Padmé survives and holds baby Leia — genuinely emotional"],
            cons: ["Can't remove the inherent plot issue of Anakin turning evil very quickly", "Order 66 sequence is unchanged — still brutal (some consider this a feature)", "HAL9000 vs L8wrtr is a genuine debate — community splits on which is better"],
            rating: "⭐⭐⭐⭐⭐ theatrical is already the best prequel / fanedit makes it even better"
          },
          negatives: ["Anakin's turn to evil happens very fast even in the original", "Padmé dying of 'a broken heart' is medically nonsensical", "Some meme-worthy dialogue remains"],
          notes: "The best prequel by far — even in theatrical form. Anakin's fall is genuinely heartbreaking here."
        }
      ]
    },
    {
      step: 3,
      phase: "ANIMATED SERIES",
      label: "Essential Lore — Fills Major Gaps",
      color: "#00BFFF",
      entries: [
        {
          title: "The Clone Wars (Animated Series) – Seasons 1–7",
          year: "2008–2020",
          type: "Animated Series (7 Seasons)",
          platform: "Disney+",
          verdict: "WATCH (Selective Order)",
          fanedit: {
            name: "Eddie Dean's 'Focused' Cut OR Galadantien/Smudger9's Movie Cuts",
            by: "Eddie Dean / Galadantien",
            why: "The full Clone Wars is 133 episodes — an enormous commitment. Fan-cut versions condense the most critical arcs into movie-length features. The Fanedit.org community recommends 'Focused' for first-timers who want story without filler. However, the Siege of Mandalore (Season 7 finale) is considered must-watch in full.",
            pros: ["Movie cuts get you the core Ahsoka, Maul, and Anakin story in manageable chunks", "You won't miss the many filler episodes (rated low by community)", "Ahsoka's arc in S7 is universally praised and best in full"],
            cons: ["Some community members argue full series is worth the investment", "Movie cuts may remove side characters who appear in later shows (Rebels, Ahsoka)", "Quality varies wildly between arcs — early seasons are noticeably weaker"],
            rating: "⭐⭐⭐⭐⭐ for key arcs / ⭐⭐⭐ for early filler seasons"
          },
          negatives: ["First 1-2 seasons are considered weak and childish", "Animation quality starts rough then improves dramatically", "Some arcs are self-contained and feel disconnected", "133 episodes is a huge time investment", "2008 movie pilot rated very low by community"],
          notes: "Skip Season 1-2 filler and the 2008 movie. Jump to curated arcs or use a fanedit movie cut. The Siege of Mandalore (S7 Ep 9-12) is some of the best Star Wars ever made."
        },
        {
          title: "Star Wars Rebels – Seasons 1–4",
          year: "2014–2018",
          type: "Animated Series (4 Seasons)",
          platform: "Disney+",
          verdict: "WATCH (After OT)",
          fanedit: { name: "No major fanedit — watch as-is", by: "N/A", why: "Rebels is generally well-paced. Season 1 is the weakest but it's a shorter series overall.", pros: ["Well-paced 4 seasons", "Strong character arcs"], cons: ["Season 1 is notably weaker"], rating: "⭐⭐⭐⭐ — Community ranks it #5 overall in the franchise" },
          negatives: ["Season 1 is noticeably more childish than later seasons", "Some CGI hasn't aged well", "Ezra is divisive as a protagonist early on"],
          notes: "Set between Ep III and Ep IV. Characters from this show appear in The Mandalorian and Ahsoka — important for Disney+ era."
        },
        {
          title: "The Bad Batch – Seasons 1–3",
          year: "2021–2024",
          type: "Animated Series (3 Seasons)",
          platform: "Disney+",
          verdict: "OPTIONAL (Recommended for Clone fans)",
          fanedit: { name: "No major fanedit needed", by: "N/A", why: "Well-produced series, optional but enjoyable.", pros: ["Excellent production quality", "Good character development"], cons: ["Side story — not essential to main saga"], rating: "⭐⭐⭐⭐ — Won 3 Saturn Awards" },
          negatives: ["Side story — not essential to main saga", "Some arcs drag in Season 2", "Won't be missed if skipped for first watch"],
          notes: "Set right after Ep III. Clone-focused. Can be watched after completing the main saga."
        },
        {
          title: "Tales of the Jedi / Tales of the Empire",
          year: "2022–2024",
          type: "Animated Anthology (Shorts)",
          platform: "Disney+",
          verdict: "WATCH (Short — Only ~4hrs total)",
          fanedit: { name: "No fanedit needed — anthology format", by: "N/A", why: "Short anthology format means no fat to trim.", pros: ["Very short time investment", "High quality shorts"], cons: ["Some episodes better than others"], rating: "⭐⭐⭐⭐ — Short and high quality" },
          negatives: ["Some episodes more interesting than others", "Assumes familiarity with Clone Wars/Rebels"],
          notes: "Short anthology format. Tales of the Jedi explores Ahsoka and Dooku. Watch after Clone Wars."
        }
      ]
    },
    {
      step: 4,
      phase: "STANDALONE FILMS",
      label: "Side Stories — Can Slot In Anywhere",
      color: "#9B59B6",
      entries: [
        {
          title: "Rogue One: A Star Wars Story",
          year: 2016,
          type: "Movie",
          platform: "Disney+",
          verdict: "WATCH (Right Before Ep IV)",
          fanedit: { name: "No major fanedit needed", by: "N/A", why: "Rogue One is generally well-regarded. Minor fan edits exist but none are considered essential.", pros: ["Strong standalone story", "Best Vader scene in modern SW", "Gritty war tone"], cons: ["No major improvements needed"], rating: "⭐⭐⭐⭐ — Community ranks it #6 overall" },
          negatives: ["CGI resurrection of Peter Cushing as Moff Tarkin is controversial/unsettling to many", "Most main characters are new with little setup time", "Ending is bittersweet — all heroes die"],
          notes: "Direct prequel to A New Hope. Watch it right before Ep IV for maximum Vader corridor payoff. Most fans rank it highly."
        },
        {
          title: "Solo: A Star Wars Story",
          year: 2018,
          type: "Movie",
          platform: "Disney+",
          verdict: "OPTIONAL",
          fanedit: { name: "HAL9000's Solo Edit", by: "HAL 9000", why: "Minor pacing improvements, removes some awkward humour.", pros: ["Tightens pacing", "Removes some weak jokes"], cons: ["Doesn't fundamentally change the film"], rating: "⭐⭐⭐ theatrical / ⭐⭐⭐ fanedit" },
          negatives: ["Bomb at the box office — many boycotted due to Disney fatigue", "Alden Ehrenreich as young Han is divisive", "Feels unnecessary — Han's backstory was more interesting as mystery", "Maul cameo feels shoehorned if you haven't watched Clone Wars", "Community ranks it low (#12 out of all SW content in Steam poll)"],
          notes: "Fun but non-essential. Save for after your first full saga watch. Watch after Clone Wars to understand the Maul cameo."
        }
      ]
    },
    {
      step: 5,
      phase: "SEQUEL TRILOGY",
      label: "Most Controversial Era — Fanedit Heavily Recommended",
      color: "#E74C3C",
      entries: [
        {
          title: "Episode VII – The Force Awakens",
          year: 2015,
          type: "Movie",
          platform: "Disney+",
          verdict: "WATCH (Fanedit Optional)",
          fanedit: {
            name: "HAL9000's 'The Force Awakens: Restructured' OR Digimodification Edit",
            by: "HAL 9000",
            why: "HAL9000's version tightens the film and removes some redundancies. The theatrical cut is still watchable though — it's the most positively received sequel.",
            pros: ["Tightened pacing", "Some scenes reordered for better flow", "HAL9000 is respected for professional-level work"],
            cons: ["Film has fundamental structural issues (copying A New Hope beat-for-beat) that editing can't fix", "Starkiller Base is still a rehashed Death Star regardless of edit"],
            rating: "⭐⭐⭐⭐ theatrical / fanedit community split"
          },
          negatives: ["Criticized widely as a remake of A New Hope rather than a new story", "Starkiller Base is a third Death Star with no new ideas", "Han Solo's death feels cheap to many", "Sets up plotlines that Ep VIII ignores entirely"],
          notes: "Fun and entertaining despite criticisms. Rey and Finn are likeable. Carries strong nostalgia weight."
        },
        {
          title: "Episode VIII – The Last Jedi",
          year: 2017,
          type: "Movie",
          platform: "Disney+",
          verdict: "FANEDIT STRONGLY RECOMMENDED",
          fanedit: {
            name: "HAL9000's 'The Last Jedi: Legendary' OR DonKamillo's Edit",
            by: "HAL 9000 / DonKamillo",
            why: "The Last Jedi is the most divisive film in the saga. HAL9000's edit removes the controversial Canto Bight casino subplot (which most critics agree adds nothing), tightens Holdo's arc, and removes some tonal inconsistencies (e.g. the iron scene). DonKamillo's is more radical.",
            pros: ["Removes Canto Bight entirely — widely celebrated by community", "Holdo/Poe conflict feels more coherent", "Iron/humor scene at opening removed — better tone", "Film becomes much more focused"],
            cons: ["Without Canto Bight, Rose Tico has almost no role — her character effectively disappears", "Core creative decisions (Luke's portrayal, Snoke's death, Rey's parentage) remain unchanged", "HAL9000 himself says editing can't fix the trilogy-level planning problem"],
            rating: "⭐⭐⭐ theatrical / ⭐⭐⭐⭐ fanedit"
          },
          negatives: ["Most divisive SW film ever — fandom literally split over it", "Ignores nearly every setup from Ep VII (Snoke, Knights of Ren, Rey's parents reversed)", "Canto Bight casino arc almost universally called padding", "Luke's characterization upsets many long-time fans", "Ranked #17 out of 21 in Steam community poll"],
          notes: "Contains genuinely great moments (Holdo maneuver, throne room fight) buried in a messy structure. Fanedit is transformative here."
        },
        {
          title: "Episode IX – The Rise of Skywalker",
          year: 2019,
          type: "Movie",
          platform: "Disney+",
          verdict: "FANEDIT STRONGLY RECOMMENDED",
          fanedit: {
            name: "HAL9000's 'The Rise of Skywalker: Ascendant' OR Wakeupkeo's 'An Old Fear'",
            by: "HAL 9000 / Wakeupkeo",
            why: "TROS is widely considered the worst sequel. HAL9000's edit is considered essential — removes the infamous 'Somehow Palpatine returned' cold open, restructures scenes, adds force ghosts to the final battle (Luke, Obi-Wan, Anakin, Yoda appear visually). Wakeupkeo's 'An Old Fear' is the fanedit.org community's top recommended sequel edit.",
            pros: ["'Somehow Palpatine returned' line softened/removed", "Force ghosts appear visually in final battle (not just voices)", "Better pacing — removes many of the frantic chase scenes", "Wakeupkeo's version is praised as making the movie emotionally resonant", "Fanedit.org community calls it the go-to sequel edit"],
            cons: ["Can't fix the core writing problem: no plan for a trilogy, Palpatine is unexplained", "Rey Palpatine twist remains — highly controversial", "Even the best edits can't create the missing middle chapter's setup"],
            rating: "⭐⭐ theatrical / ⭐⭐⭐ fanedit"
          },
          negatives: ["'Somehow Palpatine returned' with zero buildup is widely mocked", "Undoes almost everything TLJ set up, creating a trilogy that contradicts itself", "'Rey Palpatine' retcon is divisive", "Ranked #16 in Steam poll — only above Holiday Special, Resistance, and Acolyte"],
          notes: "The weakest entry in the Skywalker Saga. Use a fanedit. Despite flaws, it brings some emotional closure."
        }
      ]
    },
    {
      step: 6,
      phase: "DISNEY+ LIVE-ACTION SHOWS",
      label: "Post-Saga Stories — Quality Varies Wildly",
      color: "#2ECC71",
      entries: [
        {
          title: "Andor – Season 1 & 2",
          year: "2022–2025",
          type: "Live-Action Series",
          platform: "Disney+",
          verdict: "WATCH — Critically Acclaimed",
          fanedit: { name: "No fanedit needed", by: "N/A", why: "Andor is considered the best live-action Disney+ SW content — no editing needed.", pros: ["Grounded political thriller tone", "Best writing in Disney-era SW"], cons: ["Slow burn — first 3 episodes are setup-heavy"], rating: "⭐⭐⭐⭐⭐ — Consistently called best Disney SW show" },
          negatives: ["Very slow first 3 episodes — some drop off before it picks up", "Tone is deliberately un-Star-Wars-y which bothers some fans", "Season 2 confirmed as the final season"],
          notes: "Set before Rogue One. Many consider this the best writing in all of Star Wars. Watch after Rogue One."
        },
        {
          title: "The Mandalorian – Seasons 1–3",
          year: "2019–2023",
          type: "Live-Action Series",
          platform: "Disney+",
          verdict: "WATCH S1 & S2 / S3 Optional",
          fanedit: { name: "No major fanedit for S1-2", by: "N/A", why: "S1 and S2 are well-paced. S3 is more divisive.", pros: ["S1 and S2 excellent standalone episodes", "Grogu is universally beloved"], cons: ["S3 is widely considered weaker"], rating: "⭐⭐⭐⭐⭐ S1-S2 / ⭐⭐⭐ S3" },
          negatives: ["Season 3 considered a significant drop in quality by community", "Book of Boba Fett crossover episodes are required watching mid-Mando S3 which disrupts flow", "Some episodic filler in all seasons"],
          notes: "S1 and S2 are genuinely excellent. S3 stumbles. The Mandalorian & Grogu film arrives May 2026 in theaters."
        },
        {
          title: "The Book of Boba Fett",
          year: "2021–2022",
          type: "Live-Action Series",
          platform: "Disney+",
          verdict: "PARTIAL — Episodes 5 & 6 Only",
          fanedit: { name: "Community recommendation: skip to Ep 5-6", by: "N/A", why: "Episodes 5 and 6 are secretly Mandalorian Season 2.5 and are essential for continuity. The rest is divisive.", pros: ["Ep 5-6 are high quality Mando content"], cons: ["Rest of the series is widely considered weak"], rating: "⭐⭐ overall / ⭐⭐⭐⭐ Ep 5-6" },
          negatives: ["Main plot widely criticized as bland", "Boba Fett's characterization is divisive", "Community ranks it #14 of all SW content"],
          notes: "Skip the main story, watch episodes 5 and 6 (Mando episodes) before Mando Season 3."
        },
        {
          title: "Obi-Wan Kenobi",
          year: 2022,
          type: "Live-Action Series",
          platform: "Disney+",
          verdict: "WATCH (With Managed Expectations)",
          fanedit: { name: "HAL9000 has a fanedit condensing it to a film", by: "HAL 9000", why: "Cuts the weakest filler episode and tightens the pacing.", pros: ["Film format removes weakest episode", "Ewan McGregor and Hayden Christensen are excellent"], cons: ["Story still has plot holes"], rating: "⭐⭐⭐ theatrical / ⭐⭐⭐⭐ as film edit" },
          negatives: ["Reva's plan has major plot holes", "Some episodes considered filler", "Continuity issues with existing Star Wars canon", "Community ranks it #13"],
          notes: "Worth watching for Ewan McGregor's performance alone. The HAL9000 film edit is the recommended way to watch."
        },
        {
          title: "Ahsoka – Season 1",
          year: 2023,
          type: "Live-Action Series",
          platform: "Disney+",
          verdict: "WATCH (After Rebels)",
          fanedit: { name: "No major fanedit yet", by: "N/A", why: "Too recent for established edits.", pros: ["Direct sequel to Rebels", "Excellent Ahsoka characterization"], cons: ["Requires Rebels knowledge — confusing otherwise"], rating: "⭐⭐⭐⭐ — Considered a strong series for Rebels fans" },
          negatives: ["Almost incomprehensible without watching Rebels first", "Pacing slows significantly mid-season", "Season 2 has been delayed multiple times"],
          notes: "Watch Rebels first — otherwise major character relationships make no sense."
        },
        {
          title: "The Acolyte – Season 1",
          year: 2024,
          type: "Live-Action Series",
          platform: "Disney+",
          verdict: "SKIP / LOW PRIORITY",
          fanedit: { name: "N/A — cancelled", by: "N/A", why: "Cancelled after Season 1.", pros: ["Interesting High Republic setting"], cons: ["Cancelled — no resolution"], rating: "⭐⭐ — Cancelled, lore controversy" },
          negatives: ["Cancelled after Season 1 — no narrative resolution", "Controversial lore choices (Ki-Adi-Mundi continuity error widely noted)", "Low audience reception", "Community near-unanimously places at bottom of rankings", "Called out by fans for breaking established canon"],
          notes: "Cancelled with no resolution. Low priority for first-time viewers."
        }
      ]
    }
  ],
  recommendedOrder: [
    { n: 1, title: "Ep IV – A New Hope", note: "Harmy's Despecialized" },
    { n: 2, title: "Ep V – Empire Strikes Back", note: "Harmy's Despecialized" },
    { n: 3, title: "Ep VI – Return of the Jedi", note: "Harmy's Despecialized" },
    { n: 4, title: "Ep I – The Phantom Menace", note: "L8wrtr's Shadow of the Sith (Optional)" },
    { n: 5, title: "Ep II – Attack of the Clones", note: "L8wrtr's Republic Divided" },
    { n: 6, title: "The Clone Wars (Key Arcs)", note: "Eddie Dean's Focused Cut" },
    { n: 7, title: "Ep III – Revenge of the Sith", note: "L8wrtr's Dawn of the Empire" },
    { n: 8, title: "Tales of the Jedi", note: "Theatrical" },
    { n: 9, title: "Andor S1", note: "Theatrical" },
    { n: 10, title: "Rogue One", note: "Theatrical" },
    { n: 11, title: "Ep IV again or continue →", note: "You've now seen the full context" },
    { n: 12, title: "Rebels S1–4", note: "Theatrical" },
    { n: 13, title: "The Mandalorian S1–2", note: "Theatrical" },
    { n: 14, title: "Book of Boba Fett Ep 5–6", note: "Skip the rest" },
    { n: 15, title: "The Mandalorian S3", note: "Theatrical (Optional)" },
    { n: 16, title: "Ahsoka S1", note: "Theatrical (after Rebels)" },
    { n: 17, title: "Ep VII – Force Awakens", note: "HAL9000 Edit Optional" },
    { n: 18, title: "Ep VIII – The Last Jedi", note: "HAL9000 Legendary Edit" },
    { n: 19, title: "Ep IX – Rise of Skywalker", note: "HAL9000 Ascendant or Wakeupkeo's An Old Fear" },
    { n: 20, title: "Obi-Wan Kenobi", note: "HAL9000 Film Edit" },
    { n: 21, title: "Solo", note: "Theatrical (Optional)" },
    { n: 22, title: "Andor S2", note: "Theatrical" }
  ]
};

const verdictColors = {
  "WATCH": "#2ECC71",
  "FANEDIT STRONGLY RECOMMENDED": "#E74C3C",
  "FANEDIT RECOMMENDED": "#FF6B35",
  "WATCH (Fanedit Optional)": "#F1C40F",
  "OPTIONAL": "#95A5A6",
  "WATCH (With Managed Expectations)": "#F1C40F",
  "WATCH (After Rebels)": "#2ECC71",
  "WATCH (Selective Order)": "#F1C40F",
  "WATCH (After OT)": "#2ECC71",
  "WATCH (Right Before Ep IV)": "#2ECC71",
  "WATCH (Short — Only ~4hrs total)": "#2ECC71",
  "WATCH S1 & S2 / S3 Optional": "#2ECC71",
  "WATCH — Critically Acclaimed": "#2ECC71",
  "PARTIAL — Episodes 5 & 6 Only": "#F1C40F",
  "SKIP / LOW PRIORITY": "#95A5A6",
  "WATCH (Recommended for Clone fans)": "#3498DB"
};

export default function StarWarsGuide() {
  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState("guide");

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e8e0d0",
      fontFamily: "'Courier New', Courier, monospace",
      padding: "0 0 60px 0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #000 0%, #0a0a1a 100%)",
        borderBottom: "1px solid #FFD700",
        padding: "40px 24px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,215,0,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,150,255,0.04) 0%, transparent 50%)",
          pointerEvents: "none"
        }} />
        <div style={{ color: "#FFD700", fontSize: "10px", letterSpacing: "6px", marginBottom: "8px" }}>A LONG TIME AGO IN A GALAXY FAR, FAR AWAY...</div>
        <h1 style={{
          fontSize: "clamp(22px, 5vw, 42px)",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "#FFD700",
          letterSpacing: "4px",
          textShadow: "0 0 30px rgba(255,215,0,0.4)",
          margin: "0 0 8px 0"
        }}>STAR WARS</h1>
        <div style={{ fontSize: "clamp(11px, 2vw, 16px)", letterSpacing: "3px", color: "#aaa", marginBottom: "4px" }}>COMPLETE FIRST-TIMER'S GUIDE</div>
        <div style={{ fontSize: "11px", color: "#666", letterSpacing: "2px" }}>FAN EDITS · COMMUNITY VERDICTS · HONEST NEGATIVES</div>

        <div style={{ marginTop: "24px", display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
          {["guide", "order", "fanedits"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: activeTab === tab ? "#FFD700" : "transparent",
              color: activeTab === tab ? "#000" : "#FFD700",
              border: "1px solid #FFD700",
              padding: "8px 20px",
              fontFamily: "inherit",
              fontSize: "11px",
              letterSpacing: "2px",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "all 0.2s"
            }}>
              {tab === "guide" ? "Full Guide" : tab === "order" ? "Watch Order" : "Fan Edit Index"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 16px" }}>

        {/* WATCH ORDER TAB */}
        {activeTab === "order" && (
          <div style={{ paddingTop: "32px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ color: "#FFD700", fontSize: "11px", letterSpacing: "3px", marginBottom: "8px" }}>RECOMMENDED VIEWING SEQUENCE</div>
              <div style={{ color: "#888", fontSize: "12px" }}>Modified Machete Order · Fan Edits Noted</div>
            </div>
            {data.recommendedOrder.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "16px",
                padding: "12px 0",
                borderBottom: "1px solid #1a1a2e"
              }}>
                <div style={{
                  width: "32px", height: "32px", minWidth: "32px",
                  border: "1px solid #FFD700",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#FFD700", fontSize: "12px", fontWeight: "bold"
                }}>{item.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", color: "#e8e0d0" }}>{item.title}</div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
                    {item.note.includes("Harmy") || item.note.includes("L8wrtr") || item.note.includes("HAL") || item.note.includes("Eddie") || item.note.includes("Wakeupkeo") ? "✂️ " : ""}
                    {item.note}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "24px", padding: "16px", background: "#0f0f1a", border: "1px solid #333", fontSize: "12px", color: "#888", lineHeight: "1.8" }}>
              <div style={{ color: "#FFD700", marginBottom: "8px", letterSpacing: "2px", fontSize: "11px" }}>✂️ = FANEDIT RECOMMENDED</div>
              Fan edits are not commercially available — they must be found through communities like fanedit.org, r/fanedits, or via torrent networks. Searching the editor name + "fanedit" will usually surface them. Most are distributed as patch files (.xdelta) applied to the official Blu-ray disc.
            </div>
          </div>
        )}

        {/* FAN EDIT INDEX TAB */}
        {activeTab === "fanedits" && (
          <div style={{ paddingTop: "32px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ color: "#FFD700", fontSize: "11px", letterSpacing: "3px" }}>FAN EDIT DIRECTORY</div>
            </div>
            {[
              { film: "Ep IV – A New Hope", editor: "Harmy", name: "Despecialized Edition v2.7", tier: "Essential", desc: "Restores 1977 theatrical cut. Removes Special Edition CGI additions. Gold standard OT preservation." },
              { film: "Ep V – Empire Strikes Back", editor: "Harmy / Adywan", name: "Despecialized / Revisited", tier: "Essential", desc: "Harmy restores theatrical. Adywan adds tasteful new VFX. Community split — both excellent." },
              { film: "Ep VI – Return of the Jedi", editor: "Harmy / Spence", name: "Despecialized / Spence's Edit", tier: "Essential", desc: "Restores original Ewok song, original Anakin ghost. Removes SE additions." },
              { film: "Ep I – Phantom Menace", editor: "L8wrtr", name: "Shadow of the Sith", tier: "Strongly Rec.", desc: "Reduces Jar Jar, cuts midichlorians, tightens pacing, better tone alignment with OT." },
              { film: "Ep II – Attack of the Clones", editor: "L8wrtr", name: "The Republic Divided", tier: "Strongly Rec.", desc: "Cuts 'I hate sand', fixes romance pacing, reduces cringe factor significantly." },
              { film: "Ep III – Revenge of the Sith", editor: "L8wrtr / HAL9000", name: "Dawn of the Empire", tier: "Recommended", desc: "Removes Vader NOOO scream. HAL9000 version: Padmé survives to bring baby Leia to Alderaan." },
              { film: "Clone Wars", editor: "Eddie Dean", name: "Focused Cut", tier: "Optional", desc: "Condenses 133 episodes into key story arcs. Good for first-timers who want the story without filler." },
              { film: "Ep VII – Force Awakens", editor: "HAL 9000", name: "Force Awakens: Restructured", tier: "Optional", desc: "Minor pacing improvements. Theatrical is watchable — this is a polish job not a transformation." },
              { film: "Ep VIII – The Last Jedi", editor: "HAL 9000", name: "The Last Jedi: Legendary", tier: "Strongly Rec.", desc: "Removes entire Canto Bight casino subplot. Tightens Holdo arc. Removes opening iron scene." },
              { film: "Ep IX – Rise of Skywalker", editor: "HAL9000 / Wakeupkeo", name: "Ascendant / An Old Fear", tier: "Strongly Rec.", desc: "Removes 'Somehow Palpatine returned'. Adds force ghosts visually to final battle. Community top pick." },
              { film: "Obi-Wan Kenobi", editor: "HAL 9000", name: "Film Edit", tier: "Recommended", desc: "Condenses series into a film, cuts weakest episode, better pacing." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "14px 16px",
                borderBottom: "1px solid #1a1a2e",
                display: "flex", gap: "16px", alignItems: "flex-start"
              }}>
                <div style={{ minWidth: "90px" }}>
                  <div style={{
                    fontSize: "10px", padding: "3px 8px", textAlign: "center",
                    background: item.tier === "Essential" ? "#FFD700" : item.tier === "Strongly Rec." ? "#E74C3C" : item.tier === "Recommended" ? "#FF6B35" : "#444",
                    color: item.tier === "Essential" ? "#000" : "#fff",
                    letterSpacing: "1px"
                  }}>{item.tier}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", color: "#FFD700" }}>{item.film}</div>
                  <div style={{ fontSize: "12px", color: "#e8e0d0", marginTop: "2px" }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>by {item.editor}</div>
                  <div style={{ fontSize: "12px", color: "#999", marginTop: "6px", lineHeight: "1.6" }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: "20px 16px", background: "#0f0f1a", border: "1px solid #333", marginTop: "24px", fontSize: "12px", color: "#888", lineHeight: "1.8" }}>
              <div style={{ color: "#FFD700", fontSize: "11px", letterSpacing: "2px", marginBottom: "8px" }}>HOW TO FIND FAN EDITS</div>
              Fan edits are distributed as patch files (.xdelta format) that require you to own the official Blu-ray. Search for the editor name on fanedit.org forums or r/fanedits. Most require applying the patch to a specific Blu-ray rip using xdelta3 software. The community is helpful and has step-by-step guides.
            </div>
          </div>
        )}

        {/* MAIN GUIDE TAB */}
        {activeTab === "guide" && data.orders.map((phase, pi) => (
          <div key={pi} style={{ marginTop: "40px" }}>
            {/* Phase Header */}
            <div style={{
              borderLeft: `3px solid ${phase.color}`,
              paddingLeft: "16px",
              marginBottom: "8px"
            }}>
              <div style={{ fontSize: "10px", letterSpacing: "4px", color: phase.color }}>{`PHASE ${phase.step}`}</div>
              <div style={{ fontSize: "clamp(14px, 3vw, 20px)", fontFamily: "Georgia, serif", color: "#fff", letterSpacing: "1px" }}>{phase.phase}</div>
              <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{phase.label}</div>
            </div>

            {phase.entries.map((entry, ei) => {
              const key = `${pi}-${ei}`;
              const isOpen = expanded[key];
              const vColor = verdictColors[entry.verdict] || "#888";

              return (
                <div key={ei} style={{
                  background: "#0d0d1a",
                  border: `1px solid ${isOpen ? phase.color : "#1e1e2e"}`,
                  marginBottom: "8px",
                  transition: "border-color 0.2s"
                }}>
                  {/* Entry Header */}
                  <div
                    onClick={() => toggle(key)}
                    style={{
                      padding: "14px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap"
                    }}
                  >
                    <div style={{
                      fontSize: "10px", padding: "3px 10px",
                      background: vColor + "22",
                      color: vColor,
                      border: `1px solid ${vColor}55`,
                      letterSpacing: "1px",
                      whiteSpace: "nowrap",
                      flexShrink: 0
                    }}>{entry.verdict}</div>
                    <div style={{ flex: 1, minWidth: "180px" }}>
                      <div style={{ fontSize: "14px", color: "#e8e0d0" }}>{entry.title}</div>
                      <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>{entry.year} · {entry.type}</div>
                    </div>
                    <div style={{ color: isOpen ? phase.color : "#444", fontSize: "18px", flexShrink: 0 }}>{isOpen ? "−" : "+"}</div>
                  </div>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div style={{ padding: "0 16px 16px", borderTop: "1px solid #1e1e2e" }}>
                      {/* Notes */}
                      <div style={{ padding: "12px 0", fontSize: "13px", color: "#b0a898", lineHeight: "1.7", borderBottom: "1px solid #1e1e2e" }}>
                        {entry.notes}
                      </div>

                      {/* Fan Edit Block */}
                      {entry.fanedit && entry.fanedit.name !== "No major fanedit needed" && entry.fanedit.name !== "No fanedit needed" && entry.fanedit.name !== "No major fanedit — watch as-is" && entry.fanedit.name !== "No major fanedit needed" && entry.fanedit.name !== "N/A — cancelled" && entry.fanedit.name !== "N/A" && (
                        <div style={{ marginTop: "12px", background: "#0a0a14", border: "1px solid #2a2a3e", padding: "12px" }}>
                          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#FFD700", marginBottom: "8px" }}>✂️ FAN EDIT</div>
                          <div style={{ fontSize: "13px", color: "#FFD700" }}>{entry.fanedit.name}</div>
                          <div style={{ fontSize: "11px", color: "#666", marginBottom: "8px" }}>by {entry.fanedit.by}</div>
                          <div style={{ fontSize: "12px", color: "#888", marginBottom: "10px", lineHeight: "1.6" }}>{entry.fanedit.why}</div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            <div>
                              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#2ECC71", marginBottom: "6px" }}>PROS</div>
                              {entry.fanedit.pros.map((p, i) => (
                                <div key={i} style={{ fontSize: "11px", color: "#8ab89a", marginBottom: "4px", lineHeight: "1.5" }}>+ {p}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#E74C3C", marginBottom: "6px" }}>CONS</div>
                              {entry.fanedit.cons.map((c, i) => (
                                <div key={i} style={{ fontSize: "11px", color: "#c08080", marginBottom: "4px", lineHeight: "1.5" }}>− {c}</div>
                              ))}
                            </div>
                          </div>
                          <div style={{ marginTop: "10px", fontSize: "11px", color: "#666", borderTop: "1px solid #2a2a3e", paddingTop: "8px" }}>{entry.fanedit.rating}</div>
                        </div>
                      )}

                      {/* Negatives */}
                      <div style={{ marginTop: "12px" }}>
                        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#E74C3C", marginBottom: "8px" }}>⚠️ COMMUNITY NEGATIVES</div>
                        {entry.negatives.map((n, i) => (
                          <div key={i} style={{ fontSize: "12px", color: "#a08080", marginBottom: "4px", lineHeight: "1.6" }}>• {n}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Footer */}
        <div style={{ marginTop: "40px", padding: "20px", border: "1px solid #2a2a3e", fontSize: "11px", color: "#555", lineHeight: "1.8", textAlign: "center" }}>
          Sources: fanedit.org · r/fanedits · r/StarWars · KU Film Studies · TechRadar · GamesRadar · Steam Forums · Fanedit community consensus
        </div>
      </div>
    </div>
  );
}
