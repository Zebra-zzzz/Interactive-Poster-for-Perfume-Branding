# Interactive-Poster-for-Perfume-Branding
## Procedural and visual media

### How to interact:

**Pick three perfume ingredients by hovering over and clicking. Use the dropper to transfer the molecules of the ingredients to the perfume bottle to make your own perfume!**

![image](https://user-images.githubusercontent.com/32614665/224184748-7ada9b2d-6f98-4d64-b124-d1b5d7c3d020.png)


The ancient way of making perfume is fabulous. For example, to make rose perfume, the workers heat the rose petals and water in a mud-made container until they emit steam. They then cool down the steam and get condensed liquid rose water. In this way, the rose gets deconstructed into molecules and then combined with other natural molecules to be reconstructed into rose perfume. The process is just like how we make molecular gastronomy.

In this procedural and visual media piece, I abstracted the process of deconstructing natural ingredients into molecules to the interaction of hovering a dropper over the ingredients and the ingredient would break down into several small bricks with different colors depending on the ingredient itself. By using the dropper to transfer the molecules of the ingredients to the perfume bottle, the audience can make her own perfume. To enrich the sensory experience, I also add the sound effect corresponding to the texture of each ingredient to the interaction of picking an ingredient.

In terms of technical development, to realize the effect of dropping molecules into the perfume bottle, I used Matter.js to add the physics engine to the system. To extract the colors of each ingredient, I first generated plenty of 20* 20 squares when the audience hovers the dropper over it, and pick the color of the center pixel of each square. I then added the colors to an array, as one of the attributes of the ingredient instance. Next, I randomly chose 6 colors from the array which are the colors of the 6 molecule drops. Therefore, every time the 6 six colors you picked from an ingredient would be different.
