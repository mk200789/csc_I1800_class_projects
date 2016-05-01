from numpy import dot, array

a = [[1, 0], [0, 1]]
b = [[4, 1], [2, 2]]

result = dot(a,b)

print result


#[1 0] [4 1]
#[0 1] [2 2]

# dot product:
# [a b] [e f]
# [c d] [g h]

# [a*e + b*g		a*f + a*h]
# [c*e + d*g		c*f + c*h]


w = 1*4 + 0*2	
x = 1*1 + 0*2
y = 0*4 + 1*2
z = 0*1 + 1*2

print w, x
print y, z 


pattern1 = [array([1, -1, -1, -1, 1]),
			array([-1, 1, -1, 1, -1])]

print pattern1

