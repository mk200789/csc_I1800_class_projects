from numpy import dot, array, random

#4*4 grid
# [x o o x]
# [o x x o]
# [o o o o]
# [o x x o]
# letter A

#def output(y):
#	if y > theta: return -1
#	if -theta <= y <= theta: return 0
#	if y < -theta: return 1

#activation function
output = lambda y: -1 if y > theta  else 0 if -theta <= y <= theta else 1

#initialize weights randomly
weight = random.random(5)

#threshold theta
theta = weight[len(weight)-1]

#set learning rate a to 1 for simplicity
a = 1.0

print theta
print output(1)