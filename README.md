# badgePanel Lightning Web Component

![image](https://user-images.githubusercontent.com/42585718/194082506-419d2856-33b2-4b91-8243-29fc22c44feb.png)

## Contact me
**If you do end up using this or found it helpful, or any questions, please reach me on Twitter @scott__l**

**Please leave LICENSE file in your source and also the comments at top of the JS file even if you are modifying it for your own use.  Thanks!**

## What does it do?
badgePanel is a Lightning Web Component used to highlight or bring attention to certain field values in one area on a lightning record page. 
It does this by displaying colorful badges for each field you want highlighted.

## Background
The idea for this LWC was not my own, but from a free app exchange product.

As that LWC is a managed package, I could not view or modify the code.
So I used the idea of that, and built my own, with not as many features for free use.

## What else does it do?
In summary, you configure what fields to display, their “theme or “mode” for each badge, and to either display just the field value, the label or both label and field value.

If there is no value in the field or it is false, it will not display.  I liked this about original LWC as you could display a checkbox field with its label if it was true, and not display if false.

## Handle your errors
If you don’t have a way of displaying and handling errors, I suggest you use  https://github.com/trailheadapps/lwc-recipes/tree/main/force-app/main/default/lwc/errorPanel.
I have left a simple static error message in the html template but that is were you would add the errorPanel.
