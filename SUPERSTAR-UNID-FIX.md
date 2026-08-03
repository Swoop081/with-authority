# Superstar Base UNID Fix — v0.9.137

The original Lou Thesz Press script checks that the initiator's Base UNID is 2.
The original `stsa.gac` header confirms Stone Cold Steve Austin's Base UNID is 2.

The live match side previously exposed only the recreation roster key, so the original script rejected the card.
This build embeds authentic Base UNIDs read directly from the original base Superstar `.gac` headers and attaches them to every match side.
The correction applies globally to every Superstar-specific original card script.

Stone Cold Base UNID: 2
The Rock Base UNID: 69
